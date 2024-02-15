import { DataSource } from "@/types/wi.types";

export interface IDataStore {
  data: DataSource[];
  line_name: string | null;
  process: string | null;
  setLineName: (line_name: string | null) => void;
  setProcess: (process: string | null) => void;
  setData: (newDataArray: DataSource[]) => void;
}
