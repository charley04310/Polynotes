import { createSlice, Draft } from "@reduxjs/toolkit";
import { defaultContent } from "../../modules/database/composables/database";
import { Row, TableState } from "../../modules/database/interfaces/interfaces";

const initialState: TableState = {
  columns: [],
  rows: [],
};

let count = 0;

const dataBaseSlice = createSlice({
  name: "dataBase",
  initialState,
  reducers: {
    setdataContent: (state, action) => {
      const index = state.rows.findIndex(
        (item) => action.payload.key === item.key
      );
      console.log("index", index);

      const item = state.rows[index];
      state.rows.splice(index, 1, {
        ...item,
        ...action.payload,
      });

      console.log("state", JSON.stringify(state.rows, null, 2));
    },

    setNewRow: (state: Draft<TableState>) => {
      count++;
      const row: Row = {
        key: count.toString(),
      };

      state.columns.forEach((item) => {
        row[item.dataIndex] = defaultContent(item.typeIndex);
      });

      state.rows.push(row);
    },

    deleteRows: (state, action) => {
      const keys = action.payload;
      state.rows = state.rows.filter((item) => !keys.includes(item.key));
    },

    setNewColumn: (state, action) => {
      const { title, typeIndex } = action.payload;
      let data = title.toLowerCase();
      data = data.replace(/ /g, "");
      state.columns.push({
        title: title,
        typeIndex: typeIndex,
        dataIndex: data,
        editable: true,
      });
      console.log("data", JSON.stringify(state.columns, null, 2));
    },

    deletedata: (state, action) => {
      //
    },
  },
});

export const { setNewRow, deleteRows, setdataContent, setNewColumn } =
  dataBaseSlice.actions;

export default dataBaseSlice.reducer;
