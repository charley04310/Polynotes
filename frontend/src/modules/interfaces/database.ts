export interface EditableRowProps {
  index: number;
}
export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  typeIndex: typeIndex;
  children: React.ReactNode;
  dataIndex: string;
  blockIndex: number;
  record: any;
}
export enum typeIndex {
  TEXT = "text",
  NUMBER = "number",
  SELECT = "select",
  DATE = "date",
  CHECKBOX = "checkbox",
}
export interface ITableState {
  columns: IColumnTableDataBase[];
  rows: IRowTableDataBase[];
  trello: ITrelloState;
}
export interface ITrelloState {
  columnsTrello: string[];
  columnsTrelloStyle: IStyleHeaderTrello[];
  rowsTrello: IRowTrello[];
}
export interface IColumnTableDataBase {
  title: string;
  typeIndex: typeIndex;
  dataIndex: string;
  editable: boolean;
}
export interface IRowTableDataBase {
  key: string;
  [key: string]: any;
}

export interface IRowTrello {
  id: string;
  content:
    | string
    | {
        [key: string]: any;
      };
  column: string;
}

export interface IColumn {
  heading: string;
  elements: IRowTrello[];
  blockIndex: number;
  columnTrelloIndex: number;
  styleColumnHeader: IStyleHeaderTrello;
}

export interface IStyleHeaderTrello {
  background: string;
}
