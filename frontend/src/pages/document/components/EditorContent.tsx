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
import { HandleKeyDown } from "../composables/handleEventKeyDown";
import { useDispatch, useSelector } from "react-redux";
import Placeholder from "@tiptap/extension-placeholder";
import { IContentBlock } from "../../../store/interfaces/block";
import BubbleMenuComponent from "./BubbleMenu";
import { RootState } from "../../../store/store";
import { updatePageContent } from "../../../store/API/Page";
import { useParams } from "react-router-dom";

export interface TiptapProps {
  blockState: IContentBlock;
  handleKeyEventRefs?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const Tiptap = forwardRef(
  (
    { blockState, handleKeyEventRefs }: TiptapProps,
    ref: Ref<Editor | null>
  ) => {
    const dispatch = useDispatch();
    const globalState = useSelector((state: RootState) => state.blocks.content);
    const param = useParams();
    const [updateDataBase, setUpdateDataBase] = useState(false);
    const editor = useEditor({
      extensions: [
        StarterKit,
        Highlight,
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

    return (
      <>
        {editor && <BubbleMenuComponent editor={editor} />}

        <EditorContent
          editor={editor}
          className="editable"
          style={{ caretColor: "black", width: "90%" }}
          onKeyDown={(event) => {
            handleKeyEventRefs?.(event);
            HandleKeyDown(
              event,
              blockState,
              editor,
              dispatch,
              setUpdateDataBase
            );
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
