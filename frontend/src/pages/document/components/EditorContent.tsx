import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Focus from "@tiptap/extension-focus";
import { setBlockContent } from "../../../store/slices/blockSlice";
import "../index.css";
import { forwardRef, Ref, useEffect, useImperativeHandle } from "react";
import { HandleKeyDown } from "../composables/handleKeyDown";
import { useDispatch } from "react-redux";
import Placeholder from "@tiptap/extension-placeholder";
import { BlockState } from "../interfaces/documents";
import BubbleMenuComponent from "./BubbleMenu";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

export interface TiptapProps {
  blockState: BlockState;
  onArrowPressed?: (event: any) => void;
  onEditorChange?: (editor: Editor) => void;
}

const Tiptap = forwardRef(
  (
    { blockState, onArrowPressed, onEditorChange }: TiptapProps,
    ref: Ref<Editor | null>
  ) => {
    const disptach = useDispatch();

    const editor = useEditor({
      extensions: [
        StarterKit,
        Highlight,
        Typography,
        HorizontalRule.configure({
          HTMLAttributes: {
            class: "my-custom-class",
          },
        }),
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

    /*     useEffect(() => {
      if (editor != null) onEditorChange(editor);
    }, [editor, onEditorChange]);
 */
    const html = editor != null ? editor.getHTML() : "";
    useImperativeHandle(ref, () => editor, [editor]);

    return (
      <>
        {editor && <BubbleMenuComponent editor={editor} />}

        <EditorContent
          editor={editor}
          className="editable"
          style={{ caretColor: "black", width: "90%" }}
          onKeyDown={(event) => {
            onArrowPressed?.(event);
            HandleKeyDown(event, blockState, html, editor, disptach);
          }}
          onBlur={() => {
            disptach(
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
