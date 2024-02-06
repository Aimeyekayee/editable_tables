import { DataSource } from "@/types/wi.types";

export interface IDataStore {
  data: DataSource[];
  setData: (newDataArray: DataSource[]) => void;
}






