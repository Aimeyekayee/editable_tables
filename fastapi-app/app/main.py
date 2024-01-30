#from typing import Union
from fastapi import FastAPI,Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any,Optional,Union
from sqlalchemy.orm import Session
from .database import SessionLocal,engine
from .schemas import DataResponse
from . import crud
import json
import datetime

app = FastAPI()
origins = ["*"]

def get_db():
    db =SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/get_data_initials",response_model=List[DataResponse])
async def get_data(db: Session = Depends(get_db)):
    try:
        data = await crud.get_data(db=db)  
        response_data = []
        for item in data:
            response_item = DataResponse(
                id=item.id,
                part_no=item.part_no,
                plc_data=item.plc_data,
                image_path=item.image_path,
                created_at=item.created_at,
                updated_at=item.updated_at
            )
            response_data.append(response_item)
        return response_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")