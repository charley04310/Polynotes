import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  IRowTableDataBase,
  IRowTrello,
  ITableState,
} from "../../modules/interfaces/database";
import { initialState } from "../../pages/document/utils/dataPayload";
import { NewColumnType } from "../../modules/database/AddColumnTable";
import { defaultContent } from "../../modules/database/composables/FirstValueRowFields";

export function formatRow(row: any): IRowTrello {
  const content = (
    <div>
      {Object.entries(row).map(([propName, propValue]) => {
        if (propName !== "key" && propName !== "index") {
          return <p key={propName}>{`${propName}: ${propValue}`}</p>;
        }
      })}
    </div>
  );

  return {
    id: row.key,
    content: content,
    column: "En cours",
  };
}

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

    setNewTypeBlock: (state, action) => {
      const { index, type } = action.payload;
      //console.log("index", JSON.stringify(state[index]));
      state[index].type = type;
    },

    /*************************************** PARTIE DATABASE ***************************************/
    setNewColumn: (
      state,
      action: {
        payload: NewColumnType;
      }
    ) => {
      const { index, title, typeIndex } = action.payload;
      let data = title;
      data = data.replace(/ /g, "_");

      (state[index].content as ITableState).columns.push({
        title: title,
        typeIndex: typeIndex,
        dataIndex: data,
        editable: true,
      });
    },
    setNewRow: (state, action) => {
      const { index } = action.payload;
      const content = state[index].content as ITableState;

      if (!content.rows) return;

      const row: IRowTableDataBase = {
        key: uuidv4(),
      };

      content.columns.forEach((item) => {
        row[item.dataIndex] = defaultContent(item.typeIndex);
      });

      content.rows.push(row);

      const newObject = formatRow(row);
      content.trello.rowsTrello.push(newObject);
    },
    setRowData: (state, action) => {
      const { index, key } = action.payload;
      const content = state[index].content as ITableState;

      if (!content.rows) return;

      const indexRow = content.rows.findIndex((item) => key === item.key);
      const item = content.rows[index];
      const value = {
        ...item,
        ...action.payload,
      };
      content.rows.splice(indexRow, 1, value);

      const newObject = formatRow(value);
      const indexRowTrello = content.trello.rowsTrello.findIndex(
        (item) => key === item.id
      );
      content.trello.rowsTrello.splice(indexRowTrello, 1, newObject);
    },
    deleteRows: (state, action) => {
      const { index, keys } = action.payload;
      const content = state[index].content as ITableState;
      content.rows = content.rows.filter((item) => !keys.includes(item.key));
      content.trello.rowsTrello = content.trello.rowsTrello.filter(
        (item) => !keys.includes(item.id)
      );
    },

    /*************************************** PARTIE TRELLO ***************************************/
    setNewTrelloColumn: (state, action) => {
      const { index, title } = action.payload;
      const content = state[index].content as ITableState;
      content.trello.columnsTrello.push(title);
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
  setNewTypeBlock,
  setNewTrelloColumn,
} = blockSlice.actions;

export default blockSlice.reducer;
