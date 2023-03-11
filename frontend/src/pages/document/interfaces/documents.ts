import { RefObject } from "react";

export interface IStyleBlock {
  fontWeight: string;
  fontSize: string;
  borderBottom: string;
  color: string;
}
export interface ICustomize {
  bold: string;
  size: string;
  border: string;
  color: string;
}

export interface ITextBlock {
  content: string | JSX.Element;
  placeholder: string;
  id: string;
  style: IStyleBlock;
}

export enum PlaceHolder {
  INIT_TITLE = "Sans titre",
  PARAGR_TITLE = "Ajouter un paragraphe, un titre ou une image",
}

export interface BlockState {
  id: string;
  type: BlockType;
  ref: RefObject<HTMLDivElement> | null;
  content: string;
}

export enum BlockType {
  TIPTAP = "tiptap",
}
