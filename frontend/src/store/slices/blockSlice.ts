import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Row, TableState } from "../../modules/interfaces/database";
import { initialState } from "../../pages/document/utils/dataPayload";
import { NewColumnType } from "../../modules/database/AddColumnTable";
import { defaultContent } from "../../modules/database/composables/database";

//let rowCount = 0;

const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    /*************************************** PARTIE BLOCK ***************************************/
    setBlockContent: (state, action) => {
      const { item, content } = action.payload;
      const blockIndex = state.findIndex((block) => block.id === item.id);
      state[blockIndex].content = content;
      //console.log(content);
    },
    setNewBlock: (state, action) => {
      const { type, content, id } = action.payload;
      const newBlock = {
        id: uuidv4(),
        type: type,
        ref: null,
        content: content,
      };
      const blockIndex = state.findIndex((block) => block.id === id);

      state.splice(blockIndex + 1, 0, newBlock);
    },
    deleteBlock: (state, action) => {
      if (state.length > 1) {
        const { id } = action.payload;
        const blockIndex = state.findIndex((block) => block.id === id);
        state.splice(blockIndex, 1);
      }
    },
    /*************************************** PARTIE DATABASE ***************************************/
    setNewColumn: (
      state,
      action: {
        payload: NewColumnType;
      }
    ) => {
      const { index, title, typeIndex } = action.payload;
      console.log("index", index);
      let data = title.toLowerCase();
      data = data.replace(/ /g, "");

      (state[index].content as TableState).columns.push({
        title: title,
        typeIndex: typeIndex,
        dataIndex: data,
        editable: true,
      });
    },
    setNewRow: (state, action) => {
      const { index } = action.payload;
      const content = state[index].content as TableState;

      let rowCount = content.rows.length;

      console.log("rowCount", rowCount);
      if (!content.rows) return;
      console.log("state", JSON.stringify(state[index]));

      const row: Row = {
        key: (rowCount++).toString(),
      };

      content.columns.forEach((item) => {
        row[item.dataIndex] = defaultContent(item.typeIndex);
      });
      content.rows.push(row);
    },
    setRowData: (state, action) => {
      const { index, key } = action.payload;
      const content = state[index].content as TableState;

      if (!content.rows) return;

      const indexRow = content.rows.findIndex((item) => key === item.key);
      const item = content.rows[index];

      content.rows.splice(indexRow, 1, {
        ...item,
        ...action.payload,
      });
    },
    deleteRows: (state, action) => {
      const { index, keys } = action.payload;
      const content = state[index].content as TableState;
      content.rows = content.rows.filter((item) => !keys.includes(item.key));
    },
  },
});

export const {
  setNewBlock,
  deleteBlock,
  setBlockContent,
  setNewColumn,
  setNewRow,
  setRowData,
  deleteRows,
} = blockSlice.actions;

export default blockSlice.reducer;
