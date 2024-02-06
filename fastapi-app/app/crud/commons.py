from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import text
from fastapi import HTTPException
from typing import Optional, List, Dict, Any, Union
from app.schemas.commons import (
DataInitals
)



def convert_result(res):
    return [{c: getattr(r, c) for c in res.keys()} for r in res]


class CommonsCRUD:
    def __init__(self):
        pass
    
    async def get_data_initials(
        self,db: AsyncSession,
    ):
        try:
            stmt = f"""
            SELECT * FROM wi
            """
            rs = await db.execute(
                text(stmt),
            )
            return rs
        except Exception as e:
            print(f"Error during get data: {e}")
            raise HTTPException(status_code=400, detail=f"Bad Requst: {e}")
        
    async def update_data(self, item:DataInitals, db: AsyncSession):
        stmt = f"""
        UPDATE wi
        SET part_no=:part_no, plc_data=:plc_data
        WHERE id = :id;
        """
        rs = await db.execute(text(stmt), params={"id": item.id,"plc_data":item.plc_data,"part_no":item.part_no})
        await db.commit()  # Corrected the missing parentheses
        return rs
    