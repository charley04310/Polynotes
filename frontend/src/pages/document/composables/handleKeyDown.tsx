import { Dispatch } from "@reduxjs/toolkit";
import { Editor } from "@tiptap/react";
import {
  deleteBlock,
  setNewBlock,
  setBlockContent,
} from "../../../store/slices/blockSlice";
import { BlockState, BlockType } from "../interfaces/documents";

export const HandleKeyDown = (
  event: React.KeyboardEvent<HTMLDivElement>,
  blockState: BlockState,
  html: string,
  editor: Editor | null,
  dispatch: Dispatch<any>
) => {
  const key = event.key;
  const crlKey = event.ctrlKey;
  const removeLastBr = (editor: Editor): string => {
    const content = editor?.getHTML();
    const lastIndex = content?.lastIndexOf("<br>");
    return `${content?.slice(0, lastIndex)}${content?.slice(lastIndex + 4)}`;
  };

  switch (key) {
    case "Enter":
      if (crlKey) {
        dispatch(
          setBlockContent({
            item: blockState,
            content: html,
          })
        );
        editor?.commands.setContent(removeLastBr(editor));
        dispatch(
          setNewBlock({
            type: BlockType.TIPTAP,
            content: "",
            id: blockState.id,
          })
        );
      }
      break;
    case "Backspace":
      if (html === "<p></p>") {
        dispatch(deleteBlock(blockState));
      }

      break;

    case "ArrowUp":
      break;

    default:
      break;
  }
};
