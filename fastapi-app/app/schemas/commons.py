from pydantic import BaseModel, Extra
from typing import Optional, List, Dict, Any, Union
import datetime


class DataInitals(BaseModel):
    id: int
    line_name: str
    process: str
    part_no: str
    plc_data: str
    image_path: Optional[List[Dict[str, Any]]] = None
    created_at: Optional[datetime.datetime]
    updated_at: Optional[datetime.datetime]


class PostItem(BaseModel):
    line_name: str
    process: str
    plc_data: str
    part_no:str
    image_path: Optional[List[Dict[str, Any]]] = None

class UpsertItem(BaseModel):
    id:int
    line_name: str
    process: str
    plc_data: str
    part_no:str



class FormSearch(BaseModel):
    line_name: str
    process: str


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
