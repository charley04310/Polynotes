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
export interface TableState {
  columns: Column[];
  rows: Row[];
}
export interface Column {
  title: string;
  typeIndex: typeIndex;
  dataIndex: string;
  editable: boolean;
}
export interface Row {
  key: string;
  [key: string]: any;
}
