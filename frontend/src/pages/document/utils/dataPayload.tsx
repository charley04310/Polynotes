import { v4 as uuidv4 } from "uuid";
import { BlockState, BlockType, Column } from "../interfaces/documents";

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
    column: Column.ONE,
    ref: null,
    content: "<h1></h1>",
  },
  {
    id: uuidv4(),
    type: BlockType.TIPTAP,
    column: Column.ONE,
    ref: null,
    content: "",
  },
  {
    id: uuidv4(),
    type: BlockType.TIPTAP,
    column: 1,
    ref: null,
    content: "",
  },
  {
    id: uuidv4(),
    type: BlockType.TIPTAP,
    column: Column.ONE,
    ref: null,
    content: "",
  },
  {
    id: uuidv4(),
    type: BlockType.IMAGE,
    column: Column.ONE,
    ref: null,
    content:
      "https://www.portices.fr/wp-content/uploads/2021/05/developper-activite-internet.jpg",
  },
];
