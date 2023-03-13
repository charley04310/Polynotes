const date = new Date();
const formattedDate = date.toISOString().slice(0, 10);

export const defaultContent = (typeIndex: string) => {
  switch (typeIndex) {
    case "text":
      return "Votre texte ici";
    case "number":
      return 0;
    case "date":
      return formattedDate;
    case "checkbox":
      return "Votre texte box ici";
    default:
      return "Votre texte ici";
  }
};
