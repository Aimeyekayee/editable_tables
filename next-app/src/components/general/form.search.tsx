"use client";
import React, { useEffect, useState } from "react";
import { Form, Typography, theme, Select, Space, Button } from "antd";
import axiosInstance from "@/utils/axios";
import { DataStore } from "@/store/data.store";
import { useRouter } from "next/navigation";

interface LineName {
  line_name: string;
}
interface Process {
  process: string;
}
interface PartNo {
  part_no: string;
}

const FormSearch = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [lineName, setLineName] = useState<LineName[]>([]);
  const [process, setProcess] = useState<Process[]>([]);
  const [partno, setPartNo] = useState<PartNo[]>([]);
  const setLineNameQ = DataStore((state) => state.setLineName);
  const setProcessQ = DataStore((state) => state.setProcess);
  const processStore = DataStore((state) => state.process);
  const line_nameStore = DataStore((state) => state.line_name);
  const setData = DataStore((state) => state.setData);
  const FetchGetLineName = async () => {
    try {
      const response = await axiosInstance.get("/commons/line_name");
      if (response.status === 200) {
        setLineName(response.data.line_name);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleChangeLinename = async (value: string) => {
    setLineNameQ(value);
    try {
      const response = await axiosInstance.get(
        `/commons/process?line_name=${value}`
      );
      if (response.status === 200) {
        setProcess(response.data.process);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleChangeProcess = async (value: string) => {
    setProcessQ(value);
    try {
      const response = await axiosInstance.get(
        `/commons/part_no?process=${value}`
      );
      if (response.status === 200) {
        setPartNo(response.data.part_no);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const onFormFinish = async (v: any) => {
    try {
      const response = await axiosInstance.get("/commons/get_data_by_search", {
        params: { line_name: v.line_name, process: v.process },
      });
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    FetchGetLineName();
  }, []);

  useEffect(() => {
    router.replace(`/?line_name=${line_nameStore}&process=${processStore}`, {
      scroll: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line_nameStore, processStore]);
  const {
    token: { colorBgContainer, boxShadow },
  } = theme.useToken();
  return (
    <div style={{ height: "20rem", padding: "1rem" }}>
      <Form
        style={{
          height: "100%",
          borderRadius: "1.5rem",
          boxShadow: boxShadow,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
        form={form}
        onFinish={onFormFinish}
      >
        <Typography style={{ fontSize: "2rem", fontWeight: "500" }}>
          Adminstrator
        </Typography>
        <div style={{ display: "flex" }}>
          <Space>
            <Form.Item name="line_name" label="Line name">
              <Select style={{ width: 120 }} onChange={handleChangeLinename}>
                {lineName.map((item, idx) => {
                  return (
                    <Select.Option
                      key={`${item.line_name}`}
                      value={item.line_name}
                    >
                      {item.line_name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name="process" label="Process">
              <Select style={{ width: 120 }} onChange={handleChangeProcess}>
                {process.map((item, idx) => {
                  return (
                    <Select.Option key={`${item.process}`} value={item.process}>
                      {item.process}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Button
              type="primary"
              onClick={() => {
                form.submit();
              }}
            >
              Search
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default FormSearch;
