import { RefObject } from "react";
import { TableState } from "../../modules/interfaces/database";

export interface BlockState {
  id: string;
  type: BlockType;
  ref: RefObject<HTMLDivElement> | null;
  content: string | TableState;
}

export enum BlockType {
  TIPTAP = "tiptap",
  IMAGE = "image",
  DATABASE = "database",
}
