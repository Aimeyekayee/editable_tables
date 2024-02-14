from pydantic import BaseModel, Extra
from typing import Optional, List, Dict, Any, Union
import datetime


class DataInitals(BaseModel):
    id: int
    line_name:str
    process:str
    part_no: str
    plc_data: str
    image_path: Optional[List[Dict[str, Any]]] = None
    created_at: Optional[datetime.datetime]
    updated_at: Optional[datetime.datetime]


class DataInitalsResponse(BaseModel):
    data: List[DataInitals]


class LineName(BaseModel):
    line_name: str


class LineNameResponse(BaseModel):
    line_name: List[LineName]


class Process(BaseModel):
    process: str


class ProcessResponse(BaseModel):
    process: List[Process]

class PartNo(BaseModel):
    part_no: str


class PartNoResponse(BaseModel):
    part_no: List[PartNo]