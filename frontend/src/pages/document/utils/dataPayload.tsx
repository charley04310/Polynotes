import { v4 as uuidv4 } from "uuid";

import {
  BlockState,
  BlockType,
} from "../../../store/interfaces/block";

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
  /*   {
    id: uuidv4(),
    type: BlockType.IMAGE,
    column: Column.ONE,
    ref: null,
    content:
      "https://www.portices.fr/wp-content/uploads/2021/05/developper-activite-internet.jpg",
  }, */
  /* {
    id: uuidv4(),
    type: BlockType.DATABASE,
    ref: null,
    content: {
      columns: [
        {
          title: "Nom",
          dataIndex: "name",
          typeIndex: typeIndex.TEXT,
          editable: true,
        },
        {
          title: "Age",
          dataIndex: "age",
          typeIndex: typeIndex.NUMBER,
          editable: true,
        },
        {
          title: "Date de naissance",
          dataIndex: "date",
          typeIndex: typeIndex.DATE,
          editable: true,
        },
        {
          title: "Sexe",
          dataIndex: "sexe",
          typeIndex: typeIndex.SELECT,
          editable: true,
        }, 
      ],
      rows: [
        {
          key: "1",
          name: "Mike",
          age: 32,
          date: "1990-01-01",
          sexe: "Homme",
        },
        {
          key: "2",
          name: "John",
          age: 42,
          date: "1990-01-01",
          sexe: "Homme",
        },
        {
          key: "3",
          name: "Jane",
          age: 32,
          date: "1990-01-01",
          sexe: "Femme",
        },
      ],
    },
  }, */
];
