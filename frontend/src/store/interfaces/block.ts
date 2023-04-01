import { RefObject } from "react";
import { ITableState } from "../../modules/interfaces/database";

export interface IBlockState {
  title: string;
  isPublic: boolean;
  isEditable: boolean;
  content: IContentBlock[] | [];
}

export interface IContentBlock {
  id: string;
  type: BlockType;
  ref: RefObject<HTMLDivElement> | null;
  content: string | ITableState;
}

export enum BlockType {
  TIPTAP = "tiptap",
  IMAGE = "image",
  DATABASE = "database",
  SUBPAGE = "page",
  TRELLO = "trello",
}
