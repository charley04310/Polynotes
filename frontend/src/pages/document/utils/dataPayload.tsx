import { v4 as uuidv4 } from "uuid";
import { BlockState, BlockType } from "../interfaces/documents";

export const initTitreStyle = {
  fontWeight: "bold",
  fontSize: "50px",
  borderBottom: "0px solid grey",
  color: "black",
};

export const initialState: BlockState[] = [
  {
    id: uuidv4(),
    type: BlockType.TIPTAP,
    ref: null,
    content: "<h1></h1>",
  },
  {
    id: uuidv4(),
    type: BlockType.TIPTAP,
    ref: null,
    content: "",
  },
  {
    id: uuidv4(),
    type: BlockType.TIPTAP,
    ref: null,
    content: "",
  },
  {
    id: uuidv4(),
    type: BlockType.TIPTAP,
    ref: null,
    content: "",
  },
];
