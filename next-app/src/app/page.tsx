"use client";
import { useEffect } from "react";
import axiosInstance from "@/utils/axios";
import { DataStore } from "@/store/data.store";
import FormSearch from "@/components/general/form.search";
import TableData from "@/components/general/table.table";
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter()
  const setData = DataStore((state) => state.setData);
  const line_name = DataStore((state) => state.line_name);
  const process = DataStore((state) => state.process);
  const data = DataStore((state) => state.data);

  useEffect(() => {
    const fetchDataInitial = async () => {
      try {
        const response = await axiosInstance.get("/commons/get_data_initials");
        if (response.data && response.data.data) {
          setData(response.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDataInitial();
    router.push(`/?line_name=${line_name}&process=${process}`, {
      scroll: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FormSearch />
      <TableData data={data} />
    </>
  );
};

export default App;
