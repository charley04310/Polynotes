import { Dispatch, SetStateAction } from "react";
import { ICustomize, ITextBlock } from "../interfaces/documents";

export const initTitreStyle = {
  fontWeight: "bold",
  fontSize: "50px",
  borderBottom: "0px solid grey",
  color: "grey",
};

export const initParagrephStyle = {
  fontWeight: "300",
  fontSize: "15px",
  borderBottom: "0px solid grey",
  color: "grey",
};

export const initBlockEditor = {
  content: "Sans titre",
  id: Date.now().toString(),
  style: initTitreStyle,
};

export const setCustomContent = (
  id: string,
  style: ICustomize,
  contents: ITextBlock[],
  setContents: Dispatch<SetStateAction<ITextBlock[]>>,
  setIsModalVisible: Dispatch<SetStateAction<boolean>>
) => {
  const newStyle = {
    bold: style.bold,
    size: style.size,
    border: style.border,
    color: style.color,
  };
  const newItem = (el: { content: any }) => {
    return {
      id: id,
      content: el.content,
      style: customStyle(newStyle),
    };
  };

  const newContents = contents.map((content) =>
    content.id === id ? newItem(content) : content
  );
  setContents(newContents);
  setIsModalVisible(false);
};

export const customStyle = (style: ICustomize) => {
  return {
    fontWeight: style.bold,
    fontSize: style.size,
    borderBottom: `${style.border} solid grey`,
    color: style.color,
  };
};
