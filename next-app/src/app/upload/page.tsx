'use client'
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import environment from "@/utils/environment";
import axiosInstance from "@/utils/axios";

const props: UploadProps = {
  name: "file",
  action: `${environment.API_URL}/static/temp`,
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      const formData = new FormData();
      info.fileList.forEach((file) => {
        formData.append("file_uploads", file.originFileObj as File);
      });
      axiosInstance.post("/commons/upload", formData);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const App: React.FC = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);

export default App;
