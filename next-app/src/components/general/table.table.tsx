import { DataSource } from "@/types/wi.types";
import React from "react";
import { Table, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
interface DataTableProps {
  data: DataSource[];
}
const TableData: React.FC<DataTableProps> = ({ data }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Part Number",
      dataIndex: "part_no",
      key: "part_no",
      editable: true,
    },
    {
      title: "PLC Data",
      dataIndex: "plc_data",
      key: "plc_data",
      editable: true,
    },
    {
      title: "Image Path",
      dataIndex: "image_path",
      key: "image_path",
      editable: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "operation",
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
              <a>Cancel</a>
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
  return <Table<DataSource> dataSource={data} columns={columns} rowKey="id" />;
};

export default TableData;
