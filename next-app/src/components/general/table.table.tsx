import React, { useEffect, useState } from "react";
import {
  Table,
  Image,
  Button,
  Form,
  Input,
  Typography,
  Popconfirm,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DataSource, ImagePath } from "@/types/wi.types";
import { UploadOutlined } from "@ant-design/icons";
import { DataStore } from "@/store/data.store";
import environment from "@/utils/environment";
import axiosInstance from "@/utils/axios";
import type { UploadProps, UploadFile } from "antd";
import { useSearchParams } from "next/navigation";

interface Props {
  data: DataSource[];
}

export interface Item {
  key: string;
  part_no: string | null;
  plc_data: string | null;
  image_path: ImagePath[];
  created_at: Date | null;
  updated_at: Date | null;
}

const TableData: React.FC<Props> = ({ data }) => {
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const setData = DataStore((state) => state.setData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: Item) => record.key === editingKey;
  const [dataTable, setDataTable] = useState<Item[]>([]);
  const [uploadList, setUploadList] = useState<UploadFile[]>([]);
  const [filesPath, setFilesPath] = useState([{}]);
  const processStore = DataStore((state) => state.process);
  const line_nameStore = DataStore((state) => state.line_name);

  useEffect(() => {
    const newData = data.map((item: any) => ({
      ...item,
      key: item.id.toString(),
    }));
    setDataTable(newData);
  }, [data]);

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const savetoDb = async (savedItem: any, filesPath: any) => {
    //หา type เฉพาะมาใส่แทน any ด้วย
    //หา type เฉพาะมาใส่แทน any ด้วย
    //หา type เฉพาะมาใส่แทน any ด้วย
    savedItem.image_path = filesPath;
    console.log(savedItem);
    if ("id" in savedItem) {
      try {
        const response = await axiosInstance.put(
          "/commons/update_data",
          savedItem
        );
        if (response.status === 200) {
          setUploadList([]);
          if (response.data === true) {
            try {
              const upsertItem = {
                id: savedItem.id,
                line_name: searchParams.get("line_name"),
                process: searchParams.get("process"),
                part_no: savedItem.part_no,
                plc_data: savedItem.plc_data,
              };
              const response = await axiosInstance.put(
                "/commons/upsert_wi_info",
                upsertItem
              );
            } catch (err) {
              console.error(err);
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      const postItem = {
        line_name: searchParams.get("line_name"),
        process: searchParams.get("process"),
        plc_data: savedItem.plc_data,
        part_no: savedItem.part_no,
        image_path: filesPath,
      };
      try {
        const response = await axiosInstance.put(
          "/commons/post_data",
          postItem
        );
        if (response.status === 200) {
          console.log(response.data);
          setUploadList([]);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const save = async (key: React.Key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataTable];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        const updatedItem = { ...item, ...row };

        const { key: omitKey, ...savedItem } = updatedItem;
        console.log("Saved Item:", savedItem);
        newData.splice(index, 1, updatedItem);
        setDataTable(newData);
        setEditingKey("");
        console.log(uploadList);
        if (uploadList.length < 1) {
          savetoDb(savedItem, savedItem.image_path);
        } else {
          try {
            const formData = new FormData();
            uploadList.forEach((file) => {
              formData.append("file_uploads", file.originFileObj as File);
            });
            const response = await axiosInstance.post(
              "/commons/upload",
              formData
            );
            if (response.status === 200) {
              savetoDb(savedItem, response.data);
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    } catch (err) {
      console.error("Validate Failed:", err);
    }
  };

  const handleAdd = () => {
    const newKey = Date.now().toString(); // Generating a unique key for the new row
    const newItem: Item = {
      key: newKey,
      part_no: "",
      plc_data: "",
      image_path: [],
      created_at: null,
      updated_at: null,
    };
    setDataTable([...dataTable, newItem]);
    setEditingKey(newKey);
  };

  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/tiff",
    "image/vnd.adobe.photoshop",
    "application/pdf",
    "application/postscript",
    "application/illustrator",
    "application/x-indesign",
    "image/x-raw",
  ];

  const props: UploadProps = {
    name: "file",
    action: `${environment.API_URL}/static/temp`,
    multiple: true,
    beforeUpload(file) {
      const isAllowedType = allowedImageTypes.includes(file.type);
      if (!isAllowedType) {
        message.error(`${file.name} is not an allowed image type.`);
      }
      return isAllowedType;
    },
    onRemove(file) {
      message.warning(`ลบไฟล์ ${file.name} สำเร็จ`);
    },
    onChange(info) {
      if (info.fileList.length > 0) {
        const { status } = info.file;
        console.log(status);
        if (status !== "uploading") {
        }
        if (status === "done" || status === "removed") {
          message.success(`${info.file.name} file uploaded successfully.`);
          setUploadList(info.fileList);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      } else {
        setUploadList([]);
        form.resetFields(["image"]);
      }
    },
  };

  const columns = [
    {
      title: "Part Number",
      dataIndex: "part_no",
      editable: true,
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item name="part_no" style={{ margin: 0 }}>
            <Input />
          </Form.Item>
        ) : (
          record.part_no
        );
      },
    },
    {
      title: "PLC Data",
      dataIndex: "plc_data",
      editable: true,
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item name="plc_data" style={{ margin: 0 }}>
            <Input />
          </Form.Item>
        ) : (
          record.plc_data
        );
      },
    },
    {
      title: "Images",
      render: (text: any, record: any) => (
        <div>
          {isEditing(record) ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {record.image_path.map((image: any, index: any) => (
                <div key={`${record.id}-${index}`}>
                  <Image
                    src={`${environment.API_URL}${image.url}`}
                    alt={`Image ${index}`}
                    height={50}
                  />
                  <br />
                </div>
              ))}
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
          ) : (
            record.image_path.map((image: any, index: any) => (
              <div key={`${record.id}-${index}`}>
                <Image
                  src={`${environment.API_URL}${image.url}`}
                  alt={`Image ${index}`}
                  height={50}
                />
                <br />
              </div>
            ))
          )}
        </div>
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Typography.Link>Cancel</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  return (
    <>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{ marginBottom: 16 }}
        disabled={line_nameStore === null || processStore === null}
      >
        Add a row
      </Button>
      <Form form={form} component={false}>
        <Table
          columns={columns}
          dataSource={dataTable}
          rowKey="key"
          pagination={false}
          bordered
          size="small"
        />
      </Form>
    </>
  );
};

export default TableData;
