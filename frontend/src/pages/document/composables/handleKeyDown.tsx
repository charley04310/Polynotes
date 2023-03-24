import { Dispatch } from "@reduxjs/toolkit";
import { Editor } from "@tiptap/react";
import {
  deleteBlock,
  setNewBlock,
  setBlockContent,
} from "../../../store/slices/blockSlice";
import { IBlockState, BlockType } from "../../../store/interfaces/block";

let timeoutId: NodeJS.Timeout | null = null;

export const HandleKeyDown = (
  event: React.KeyboardEvent<HTMLDivElement>,
  blockState: IBlockState,
  editor: Editor | null,
  dispatch: Dispatch<any>,
  setUpdateDataBase: (value: boolean) => void
) => {
  const key = event.key;
  const crlKey = event.ctrlKey;
  const removeLastBr = (editor: Editor): string => {
    const content = editor?.getHTML();
    const lastIndex = content?.lastIndexOf("<br>");
    return `${content?.slice(0, lastIndex)}${content?.slice(lastIndex + 4)}`;
  };
  const content = editor?.getHTML();

  switch (key) {
    case "Enter":
      if (crlKey) {
        // TODO: possible de supprimer ce dispatch ?
        dispatch(
          setBlockContent({
            item: blockState,
            content: content,
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

    default:
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (key !== "Backspace") {
        timeoutId = setTimeout(() => {
          const content = editor?.getHTML();
          console.log("content", content);
          dispatch(
            setBlockContent({
              item: blockState,
              content: content,
            })
          );
          console.log("updateDataBase", content);
          setUpdateDataBase(true);
        }, 1500);
        break;
      }
  }
};
