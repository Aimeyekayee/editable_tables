from sqlalchemy.ext.asyncio import AsyncSession
from app.crud import CommonsCRUD
from app.schemas.commons import DataInitals, LineName, Process, PartNo
import json
from typing import Optional, List, Dict, Any, Union
import datetime


class CommonsManager:
    def __init__(self) -> None:
        self.crud = CommonsCRUD()

    async def get_data_initials(
        self,
        db: AsyncSession = None,
    ):
        res = await self.crud.get_data_initials(db=db)
        return_list = []
        for r in res:
            key_index = r._key_to_index
            return_list.append(
                DataInitals(
                    id=r[key_index["id"]],
                    line_name=r[key_index["line_name"]],
                    process=r[key_index["process"]],
                    part_no=r[key_index["part_no"]],
                    plc_data=r[key_index["plc_data"]],
                    updated_at=r[key_index["updated_at"]],
                    created_at=r[key_index["created_at"]],
                    image_path=r[key_index["image_path"]],
                )
            )
        return return_list

    async def get_line_name(
        self,
        db: AsyncSession = None,
    ):
        res = await self.crud.get_line_name(db=db)
        return_list = []
        for r in res:
            key_index = r._key_to_index
            return_list.append(
                LineName(
                    line_name=r[key_index["line_name"]],
                )
            )
        return return_list

    async def get_process(
        self,
        line_name: str,
        db: AsyncSession = None,
    ):
        res = await self.crud.get_process(line_name=line_name, db=db)
        return_list = []
        for r in res:
            key_index = r._key_to_index
            return_list.append(
                Process(
                    process=r[key_index["process"]],
                )
            )
        return return_list

    async def get_partno(
        self,
        process: str,
        db: AsyncSession = None,
    ):
        res = await self.crud.get_partno(process=process, db=db)
        return_list = []
        for r in res:
            key_index = r._key_to_index
            return_list.append(
                PartNo(
                    part_no=r[key_index["part_no"]],
                )
            )
        return return_list

    async def update_data(
        self,
        item: DataInitals,
        db: AsyncSession = None,
    ):
        await self.crud.update_data(db=db, item=item)
        return True
