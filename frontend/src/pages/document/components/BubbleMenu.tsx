import { BubbleMenu, Editor } from "@tiptap/react";

interface IBubbleMenu {
  editor: Editor;
}

const BubbleMenuComponent: React.FC<IBubbleMenu> = ({ editor }) => {
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock")
            ? "button-marks-is-active"
            : "button-marks"
        }
      >
        code block
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold") ? "button-marks-is-active" : "button-marks"
        }
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic") ? "button-marks-is-active" : "button-marks"
        }
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike") ? "button-marks-is-active" : "button-marks"
        }
      >
        strike
      </button>
    </BubbleMenu>
  );
};

export default BubbleMenuComponent;
