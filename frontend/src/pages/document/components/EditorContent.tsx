import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Focus from "@tiptap/extension-focus";
import { setBlockContent, deleteBlock } from "../../../store/slices/blockSlice";
import "../index.css";
import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { HandleKeyDown } from "../composables/handleKeyDown";
import { useDispatch, useSelector } from "react-redux";
import Placeholder from "@tiptap/extension-placeholder";
import { IBlockState } from "../../../store/interfaces/block";
import BubbleMenuComponent from "./BubbleMenu";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { RootState } from "../../../store/store";
import { updatePageContent } from "../../../store/API/Page";
import { useParams } from "react-router-dom";

export interface TiptapProps {
  blockState: IBlockState;
  onArrowPressed?: (event: any) => void;
}

const Tiptap = forwardRef(
  ({ blockState, onArrowPressed }: TiptapProps, ref: Ref<Editor | null>) => {
    const dispatch = useDispatch();
    const globalState = useSelector((state: RootState) => state.blocks);
    const param = useParams();
    const [updateDataBase, setUpdateDataBase] = useState(false);
    const editor = useEditor({
      extensions: [
        StarterKit,
        Highlight,
        HorizontalRule,
        Typography,

        Placeholder.configure({
          // Use different placeholders depending on the node type:
          placeholder: ({ node }) => {
            if (node.type.name === "heading") {
              return `Titre de niveau ${node.attrs.level}`;
            }
            return "Ajouter du contenu...";
          },
        }),
        Focus.configure({
          className: "has-focus",
          mode: "all",
        }),
      ],
      content: blockState.content,
      autofocus: "end",
    });
    const html = editor != null ? editor.getHTML() : "";
    useImperativeHandle(ref, () => editor, [editor]);

    useEffect(() => {
      (async () => {
        if (updateDataBase) {
          console.log("updateDataBase");
          if (!param.id) return;
          await updatePageContent(param.id, globalState);
          setUpdateDataBase(false);
        }
      })();
    }, [updateDataBase, globalState, param.id]);

    const handleDeleteBlock = async (event: any) => {
      if (html === "<p></p>" && event.key === "Backspace") {
        dispatch(deleteBlock({ id: blockState.id }));
        setTimeout(() => {
          console.log(globalState);
        }, 2000);
        /*  if (!param.id) return;
        await updatePageContent(param.id, globalState); */
      }
    };

    return (
      <>
        {editor && <BubbleMenuComponent editor={editor} />}

        <EditorContent
          editor={editor}
          className="editable"
          style={{ caretColor: "black", width: "90%" }}
          onKeyDown={(event) => {
            onArrowPressed?.(event);
            HandleKeyDown(
              event,
              blockState,
              editor,
              dispatch,
              setUpdateDataBase
            );
            handleDeleteBlock(event);
          }}
          onBlur={() => {
            dispatch(
              setBlockContent({
                item: blockState,
                content: html,
              })
            );
          }}
        />
      </>
    );
  }
);

export default Tiptap;
