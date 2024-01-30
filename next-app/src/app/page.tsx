"use client";
import FormSearch from "@/components/general/form.search";
import { Typography } from "antd";
import React, { useEffect } from "react";
import TableData from "@/components/general/table.table";
import axios from "axios";
import { DataStore } from "@/store/data.store";

const App = () => {
  const setData = DataStore((state) => state.setData);
  const data = DataStore((state) => state.data);
  const fetchDataInitial = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/get_data_initials"
      );
      if (response.data) {
        setData(response.data);
        console.log(response.data)
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchDataInitial();
  }, []);
  return (
    <>
      <FormSearch />
      <TableData data={data}/>
    </>
  );
};

export default App;
