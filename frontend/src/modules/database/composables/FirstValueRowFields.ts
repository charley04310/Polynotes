import { typeIndex } from "../../interfaces/database";

const date = new Date();
const formattedDate = date.toISOString().slice(0, 10);

export const defaultContent = (index: string) => {
  switch (index) {
    case typeIndex.TEXT:
      return "Your text here";
    case typeIndex.NUMBER:
      return 0;
    case typeIndex.DATE:
      return formattedDate;
    case typeIndex.CHECKBOX:
      return "Your text box here";
    case typeIndex.SELECT:
      return "Your selection here";
    default:
      return "Your text here";
  }
};
