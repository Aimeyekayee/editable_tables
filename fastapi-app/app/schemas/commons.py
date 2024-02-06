from pydantic import BaseModel, Extra
from typing import Optional, List, Dict, Any, Union
import datetime


class DataInitals(BaseModel):
    id:int
    part_no:str
    plc_data:str
    image_path:Optional[List[Dict[str,Any]]] = None
    created_at:Optional[datetime.datetime]
    updated_at:Optional[datetime.datetime]

class DataInitalsResponse(BaseModel):
    data:List[DataInitals]

