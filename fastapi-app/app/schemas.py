from pydantic import BaseModel
from typing import Optional
import datetime

class DataResponse(BaseModel):
  id:int
  part_no:Optional[str]
  plc_data:Optional[str]
  image_path:Optional[str]
  created_at:Optional[datetime.datetime]
  updated_at:Optional[datetime.datetime]