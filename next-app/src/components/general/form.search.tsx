"use client";
import React, { useEffect, useState } from "react";
import { Form, Typography, theme, Select, Space, Button } from "antd";
import axiosInstance from "@/utils/axios";

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
  const [form] = Form.useForm();
  const [lineName, setLineName] = useState<LineName[]>([]);
  const [process, setProcess] = useState<Process[]>([]);
  const [partno, setPartNo] = useState<PartNo[]>([]);

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
  const onFormFinish = (v: any) => {
    console.log(v);
  };

  useEffect(() => {
    FetchGetLineName();
  }, []);

  useEffect(() => {
    console.log(lineName);
  }, [lineName]);
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
            <Form.Item name="part_no" label="Part Number">
              <Select
                style={{ width: 120 }}
                // onChange={handleChange}
              >
                {partno.map((item, idx) => {
                  return (
                    <Select.Option key={`${item.part_no}`} value={item.part_no}>
                      {item.part_no}
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
            >Search</Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default FormSearch;
