"use client";
import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

const generateDateColumns = (numberOfDates: number) => {
  return Array.from({ length: numberOfDates }, (_, index) => ({
    title: `${index + 1}`,
    dataIndex: `${index + 1}`,
    key: `${index + 1}`,
    width: 50,
  }));
};

const columns = [
  {
    title: 'Type',
    width: 70,
    dataIndex: 'type',
    key: 'type',
    fixed: 'left',
  },
  {
    title: 'Defect',
    width: 300,
    dataIndex: 'defect',
    key: 'defect',
    fixed: 'left',
  },
  {
    title: 'Target by items',
    width: 128,
    dataIndex: 'target',
    key: 'target',
    fixed: 'left',
  },
  // Dynamically generate date columns using the utility function
  ...generateDateColumns(31),
];

const App = () => (
  <Table
    className="custom-table"
    columns={columns as any}
    scroll={{ x: 1500, y: 300 }}
    pagination={false}
    showHeader={true}
  />
);

export default App;