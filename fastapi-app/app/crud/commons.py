from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import text
from fastapi import HTTPException
from typing import Optional, List, Dict, Any, Union
from app.schemas.commons import DataInitals, FormSearch, PostItem, UpsertItem


def convert_result(res):
    return [{c: getattr(r, c) for c in res.keys()} for r in res]


class CommonsCRUD:
    def __init__(self):
        pass

    async def get_data_initials(
        self,
        db: AsyncSession,
    ):
        try:
            stmt = f"""
            SELECT * FROM wi_data
            """
            rs = await db.execute(
                text(stmt),
            )
            return rs
        except Exception as e:
            print(f"Error during get data: {e}")
            raise HTTPException(status_code=400, detail=f"Bad Requst: {e}")

    async def get_data_by_search(
        self,
        line_name: str,
        process: str,
        db: AsyncSession,
    ):
        try:
            stmt = f"""
            SELECT * FROM wi_data
            WHERE line_name = :line_name AND process = :process
            """
            rs = await db.execute(
                text(stmt),
                params={"line_name": line_name, "process": process},
            )
            return rs
        except Exception as e:
            print(f"Error during get data: {e}")
            raise HTTPException(status_code=400, detail=f"Bad Requst: {e}")

    async def get_line_name(
        self,
        db: AsyncSession,
    ):
        try:
            stmt = f"""
            SELECT DISTINCT line_name FROM wi_info
            """
            rs = await db.execute(
                text(stmt),
            )
            return rs
        except Exception as e:
            print(f"Error during get data: {e}")
            raise HTTPException(status_code=400, detail=f"Bad Requst: {e}")

    async def get_process(
        self,
        line_name: str,
        db: AsyncSession,
    ):
        try:
            stmt = f"""
            SELECT DISTINCT process FROM wi_info
            WHERE line_name = :line_name
            """
            rs = await db.execute(
                text(stmt),
                params={"line_name": line_name},
            )
            return rs
        except Exception as e:
            print(f"Error during get data: {e}")
            raise HTTPException(status_code=400, detail=f"Bad Requst: {e}")

    async def get_partno(
        self,
        process: str,
        db: AsyncSession,
    ):
        try:
            stmt = f"""
            SELECT DISTINCT part_no FROM wi_info
            WHERE process = :process
            """
            rs = await db.execute(
                text(stmt),
                params={"process": process},
            )
            return rs
        except Exception as e:
            print(f"Error during get data: {e}")
            raise HTTPException(status_code=400, detail=f"Bad Requst: {e}")

    async def update_data(self, item: DataInitals, db: AsyncSession):
        stmt = f"""
        UPDATE wi_data
        SET part_no=:part_no, plc_data=:plc_data, image_path=cast(:image_path AS jsonb)
        WHERE id = :id;
        """
        rs = await db.execute(
            text(stmt),
            params={
                "id": item.id,
                "plc_data": item.plc_data,
                "part_no": item.part_no,
                "image_path": item.image_path,
            },
        )
        await db.commit()  # Corrected the missing parentheses
        return rs

    async def upsert_wi_info_with_id(self, upsertItem: UpsertItem, db: AsyncSession):
        stmt = f"""
        UPDATE wi_data
        SET part_no=:part_no, plc_data=:plc_data, image_path=cast(:image_path AS jsonb)
        WHERE id = :id;
        """
        rs = await db.execute(
            text(stmt),
            params={
                "id": item.id,
                "plc_data": item.plc_data,
                "part_no": item.part_no,
                "image_path": item.image_path,
            },
        )
        await db.commit()  # Corrected the missing parentheses
        return rs

    async def post_data(self, postItem: PostItem, db: AsyncSession):
        stmt = f"""
        INSERT INTO wi_data(
	    part_no, plc_data,line_name, process, image_path)
	    VALUES (:part_no, :plc_data, :line_name, :process, cast(:image_path AS jsonb))
        """
        rs = await db.execute(
            text(stmt),
            params={
                "part_no": postItem.part_no,
                "plc_data": postItem.plc_data,
                "line_name": postItem.line_name,
                "process": postItem.process,
                "image_path": postItem.image_path,
            },
        )
        await db.commit()
        return rs
