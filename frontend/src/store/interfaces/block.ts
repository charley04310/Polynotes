import { RefObject } from "react";
import { ITableState } from "../../modules/interfaces/database";

export interface IBlockState {
  id: string;
  type: BlockType;
  ref: RefObject<HTMLDivElement> | null;
  content: string | ITableState;
}

export enum BlockType {
  TIPTAP = "tiptap",
  IMAGE = "image",
  DATABASE = "database",
  TRELLO = "trello",
}
