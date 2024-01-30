"use client";
import React from "react";
import { Form, Typography, theme, Select, Space } from "antd";

const FormSearch = () => {
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
          gap:"1rem"
        }}
      >
        <Typography style={{ fontSize: "2rem", fontWeight: "500" }}>
          Adminstrator
        </Typography>
        <div style={{ display: "flex" }}>
          <Space>
            <Form.Item name="line_name" label="Line name">
              <Select
                style={{ width: 120 }}
                // onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
            </Form.Item>
            <Form.Item name="process" label="Process">
              <Select
                style={{ width: 120 }}
                // onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
            </Form.Item>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default FormSearch;
