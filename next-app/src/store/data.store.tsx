import { create } from "zustand";
import { IDataStore } from "./interface/wi.interface";

export const DataStore = create<IDataStore>((...args) => {
  const [set, get] = args;
  return {
    data: [],
    line_name: null,
    process: null,
    setLineName(line_name) {
      set({ line_name });
    },
    setProcess(process) {
      set({ process });
    },
    setData(newDataArray) {
      set({ data: newDataArray });
    },
  };
});
