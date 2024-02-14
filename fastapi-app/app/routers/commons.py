from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from typing import AsyncGenerator, List, Optional, Annotated
import random
import json
import string
import os
from app.schemas.commons import (
    DataInitalsResponse,
    DataInitals,
    LineNameResponse,
    ProcessResponse,
    PartNoResponse,
)
from app.manager import CommonsManager
from app.functions import api_key_auth


def commons_routers(db: AsyncGenerator) -> APIRouter:
    router = APIRouter()
    manager = CommonsManager()

    @router.get(
        "/get_data_initials",
        response_model=DataInitalsResponse,
        dependencies=[Depends(api_key_auth)],
    )
    async def get_data_initials(db: AsyncSession = Depends(db)):
        try:
            data_initials = await manager.get_data_initials(db=db)
            return DataInitalsResponse(data=data_initials)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error during get data1 : {e}")

    @router.get(
        "/line_name",
        response_model=LineNameResponse,
        dependencies=[Depends(api_key_auth)],
    )
    async def get_line_name(db: AsyncSession = Depends(db)):
        try:
            line_name = await manager.get_line_name(db=db)
            return LineNameResponse(line_name=line_name)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error during get data1 : {e}")

    @router.get(
        "/process",
        response_model=ProcessResponse,
        dependencies=[Depends(api_key_auth)],
    )
    async def get_process(line_name=str, db: AsyncSession = Depends(db)):
        try:
            process = await manager.get_process(line_name=line_name, db=db)
            return ProcessResponse(process=process)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error during get data1 : {e}")

    @router.get(
        "/part_no",
        response_model=PartNoResponse,
        dependencies=[Depends(api_key_auth)],
    )
    async def get_partno(process=str, db: AsyncSession = Depends(db)):
        try:
            part_no = await manager.get_partno(process=process, db=db)
            return PartNoResponse(part_no=part_no)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error during get data1 : {e}")

    @router.put(
        "/update_data",
        dependencies=[Depends(api_key_auth)],
    )
    async def update_data(item: DataInitals, db: AsyncSession = Depends(db)):
        try:
            item.image_path = json.dumps(item.image_path)
            update_data = await manager.update_data(item, db=db)
            return {"success": True}
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error during update : {e}")

    @router.post("/upload", response_model=List[dict])
    async def create_upload_file(file_uploads: list[UploadFile]):
        file_info_list = []
        for file_upload in file_uploads:
            try:
                data = await file_upload.read()
                rd = "".join(
                    random.SystemRandom().choice(string.ascii_uppercase + string.digits)
                    for _ in range(8)
                )
                file_name = f"{rd}_{file_upload.filename}"
                file_path = os.path.join("uploaded_files", file_name)
                with open(file_path, "wb") as f:
                    f.write(data)
                url = f"/static/{file_name}"
                file_info = {"local_path": file_path, "url": url}
                file_info_list.append(file_info)
            except Exception as e:
                raise HTTPException(
                    status_code=500, detail=f"Error processing file: {str(e)}"
                )
        return file_info_list

    return router
