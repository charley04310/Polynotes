export interface TableState {
  columns: Column[];
  rows: Row[];
}

export interface Column {
  title: string;
  typeIndex: string;
  dataIndex: string;
  editable: boolean;
}

export interface Row {
  key: string;
  [key: string]: any;
}
