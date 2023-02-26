import { Dispatch, SetStateAction } from "react";
import { ITextBlock } from "../interfaces/documents";
import { initParagrephStyle } from "./style";

export const HandleKeyDown = (
  event: React.KeyboardEvent<HTMLDivElement>,
  isModalVisible: Boolean,
  contents: ITextBlock[],
  setContents: Dispatch<SetStateAction<ITextBlock[]>>,
  setIsModalVisible: Dispatch<SetStateAction<boolean>>
) => {
  const targetTextContent = event.currentTarget.textContent;

  switch (event.key) {
    case "Enter": {
      if (isModalVisible) break;
      event.preventDefault();
      const newContents = [
        ...contents,
        {
          content: "New Content",
          id: Date.now().toString(),
          style: initParagrephStyle,
        },
      ];
      setContents(newContents);
      break;
    }
    case "Backspace": {
      if (isModalVisible) break;
      if (targetTextContent?.length === 0) {
        event.preventDefault();
        const newContents = [...contents];
        if (contents.length > 1) {
          newContents.pop();
          setContents(newContents);
        }
      }
      if (
        targetTextContent === "New Content" ||
        targetTextContent === "Sans titre"
      ) {
        event.preventDefault();
        const newContents = [...contents];
        const lastContent = newContents[newContents.length - 1];
        lastContent.content = "";
        lastContent.style.color = "black";
        setContents(newContents);
      }
      break;
    }
    case "/": {
      if (isModalVisible) break;

      if (
        targetTextContent?.length === 0 ||
        targetTextContent === "Sans titre" ||
        targetTextContent === "New Content"
      ) {
        event.preventDefault();
        const newContents = [...contents];
        const lastContent = newContents[newContents.length - 1];
        lastContent.content = "";
        lastContent.style.color = "black";
        setContents(newContents);
        setIsModalVisible(true);
      }

      break;
    }

    default: {
      if (
        targetTextContent === "New Content" ||
        targetTextContent === "Sans titre"
      ) {
        if (/^[a-zA-Z]$/.test(event.key)) {
          event.preventDefault();
          const newContents = [...contents];
          const lastContent = newContents[newContents.length - 1];
          lastContent.content = event.key;
          lastContent.style.color = "black";
          setContents(newContents);
        }
      }
      break;
    }
  }
};
