import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  IRowTableDataBase,
  ITableState,
} from "../../modules/interfaces/database";
import { initialState } from "../../pages/document/utils/dataPayload";
import { NewColumnType } from "../../modules/database/AddColumnTable";
import { defaultContent } from "../../modules/database/composables/FirstValueRowFields";
import { formatRow } from "../composables/FormatRow";

const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    /*************************************** PARTIE BLOCK ***************************************/
    setStoreState: (state, action) => {
      const { payload } = action;
      return payload;
    },
    setBlockContent: (state, action) => {
      const { item, content } = action.payload;
      const blockIndex = state.content.findIndex(
        (block) => block.id === item.id
      );
      state.content[blockIndex].content = content;
    },
    setNewBlock: (state, action) => {
      const { type, content, id } = action.payload;
      const newBlock = {
        id: uuidv4(),
        type: type,
        ref: null,
        content: content,
      };

      const blockIndex = state.content.findIndex((block) => block.id === id);

      state.content.splice(blockIndex + 1, 0, newBlock);
    },
    deleteBlock: (state, action) => {
      if (state.content.length > 1) {
        const { id } = action.payload;
        const blockIndex = state.content.findIndex((block) => block.id === id);
        state.content.splice(blockIndex, 1);
      }
    },
    setNewTypeBlock: (state, action) => {
      const { index, type } = action.payload;
      //console.log("index", JSON.stringify(state[index]));
      state.content[index].type = type;
    },
    /*************************************** PARTIE DATABASE ***************************************/
    setNewColumn: (
      state,
      action: {
        payload: NewColumnType;
      }
    ) => {
      const { index, title, typeIndex } = action.payload;
      const content = state.content[index].content as ITableState;
      if (title === "") return;
      if (content.columns.some((item) => item.title === title)) return;

      const data = title;
      data.replace(/ /g, "_");

      content.columns.push({
        title: title,
        typeIndex: typeIndex,
        dataIndex: data,
        editable: true,
      });
    },
    setNewRow: (state, action) => {
      const { index } = action.payload;
      const content = state.content[index].content as ITableState;

      if (!content.rows) return;

      const row: IRowTableDataBase = {
        key: uuidv4(),
      };

      content.columns.forEach((item) => {
        row[item.dataIndex] = defaultContent(item.typeIndex);
      });

      content.rows.push(row);

      const defaultColumn = content.trello.columnsTrello[0];
      const newObject = formatRow(row, defaultColumn);

      content.trello.rowsTrello.push(newObject);
    },
    setRowData: (state, action) => {
      const { index, key } = action.payload;
      const content = state.content[index].content as ITableState;
      if (!content.rows) return;

      const indexRow = content.rows.findIndex((item) => key === item.key);
      const item = content.rows[index];
      const value = {
        ...item,
        ...action.payload,
      };
      content.rows.splice(indexRow, 1, value);
      const defaultColumn = content.trello.columnsTrello[0];
      const newObject = formatRow(value, defaultColumn);
      const indexRowTrello = content.trello.rowsTrello.findIndex(
        (item) => key === item.id
      );
      content.trello.rowsTrello.splice(indexRowTrello, 1, newObject);
    },
    deleteRows: (state, action) => {
      const { index, keys } = action.payload;
      const content = state.content[index].content as ITableState;
      content.rows = content.rows.filter((item) => !keys.includes(item.key));
      content.trello.rowsTrello = content.trello.rowsTrello.filter(
        (item) => !keys.includes(item.id)
      );
    },

    /*************************************** PARTIE TRELLO ***************************************/
    setNewTrelloColumn: (state, action) => {
      const { index, title } = action.payload;
      const content = state.content[index].content as ITableState;

      if (title === "") return;
      if (content.trello.columnsTrello.includes(title)) return;
      if (content.trello.columnsTrello.length > 3) return;

      content.trello.columnsTrello.push(title);
      content.trello.columnsTrelloStyle.push({
        background: "#001529",
      });
    },
    setRowTrelloToColumn: (state, action) => {
      const { index, value } = action.payload;
      const content = state.content[index].content as ITableState;
      content.trello.rowsTrello = value;
    },
    setColumnNewTitle: (state, action) => {
      const { index, valueToReplace, newValue } = action.payload;
      const content = state.content[index].content as ITableState;

      if (newValue === "") return;
      if (content.trello.columnsTrello.includes(newValue)) return;

      const indexOfColumn =
        content.trello.columnsTrello.indexOf(valueToReplace);

      content.trello.columnsTrello.splice(indexOfColumn, 1, newValue);
      content.trello.rowsTrello.forEach((item) => {
        if (item.column === valueToReplace) {
          item.column = newValue;
        }
      });
    },
    deleteTrelloColumn: (state, action) => {
      const { blockIndex, columnTrelloIndex, value } = action.payload;
      const content = state.content[blockIndex].content as ITableState;

      if (content.trello.columnsTrello.length === 1) return;

      const firstIndex = content.trello.columnsTrello[0];
      const newColumns = content.trello.columnsTrello.filter(
        (item) => item !== value
      );

      content.trello.columnsTrello = newColumns;
      content.trello.rowsTrello.forEach((item) => {
        if (item.column === value) {
          item.column = firstIndex;
        }
      });
      content.trello.columnsTrelloStyle.splice(columnTrelloIndex, 1);
    },
    setStyleColumn: (state, action) => {
      const { background, indexBlock, indexColumn } = action.payload;
      const content = state.content[indexBlock].content as ITableState;

      content.trello.columnsTrelloStyle[indexColumn] = {
        background: background,
      };
    },
  },
});

export const {
  setStoreState,
  setNewBlock,
  deleteBlock,
  setBlockContent,
  setNewColumn,
  setNewRow,
  setRowData,
  deleteRows,
  setNewTypeBlock,
  setNewTrelloColumn,
  setRowTrelloToColumn,
  setColumnNewTitle,
  deleteTrelloColumn,
  setStyleColumn,
} = blockSlice.actions;

export default blockSlice.reducer;
