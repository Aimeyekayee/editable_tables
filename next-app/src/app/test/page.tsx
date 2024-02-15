'use client'
import React from "react";
import dayjs from 'dayjs';
import { Button } from "antd";

const page = () => {
  const cdate = dayjs().format("DD MMMM YYYY HH:mm:ss");
  return <div>
  <Button onClick={()=>{console.log(cdate)}}>as</Button></div>;
};

export default page;
