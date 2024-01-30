import { create } from "zustand";
import { IDataStore } from "./interface/wi.interface";

export const DataStore = create<IDataStore>((...args) => {
  const [set, get] = args;
  return {
    data: [],
    setData(newDataArray) {
      set({ data: newDataArray });
    },
  };
});
