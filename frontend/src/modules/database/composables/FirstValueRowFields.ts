import { typeIndex } from "../../interfaces/database";

const date = new Date();
const formattedDate = date.toISOString().slice(0, 10);

export const defaultContent = (index: string) => {
  switch (index) {
    case typeIndex.TEXT:
      return "Votre texte ici";
    case typeIndex.NUMBER:
      return 0;
    case typeIndex.DATE:
      return formattedDate;
    case typeIndex.CHECKBOX:
      return "Votre texte box ici";
    case typeIndex.SELECT:
      return "Votre selction ici";
    default:
      return "Votre texte ici";
  }
};
