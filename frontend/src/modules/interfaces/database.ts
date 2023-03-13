export interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
  date: string;
  checkbox: string;
}
export interface EditableRowProps {
  index: number;
}

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  typeIndex: "text" | "number" | "select" | "date" | "checkbox";
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  setdataContent: (record: Item) => void;
}
