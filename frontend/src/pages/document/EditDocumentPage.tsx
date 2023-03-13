import { useRef } from "react";
import "./index.css";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import Tiptap from "./components/EditorContent";
import { Editor } from "@tiptap/react";
import { BlockState, BlockType } from "./interfaces/documents";
import ImageBlockComponent from "./components/ImageBlock";
import DropDownMenu from "./components/DropDownMenu";
import TableDataBase from "./components/DataBaseTable";

const EditDocumentPage = () => {
  const refs = useRef<(Editor | null)[]>([]);

  const blocksPage: BlockState[] = useSelector(
    (state: RootState) => state.blocks
  );

  const getNewFocus = (newIndex: number) => {
    refs.current[newIndex]?.chain().focus().run();
  };

  return (
    <>
      {blocksPage.map((item, index) => (
        <div
          key={item.id}
          className="block"
          style={{ display: "flex", alignItems: "center" }}
        >
          <DropDownMenu editor={refs.current[index]} item={item} />
          {item.type === BlockType.TIPTAP ? (
            <Tiptap
              blockState={item}
              ref={(ref) => {
                refs.current[index] = ref;
              }}
              onArrowPressed={(event) => {
                console.log("event", event);
                let newIndex = index;
                if (event.key === "ArrowUp") newIndex--;
                if (event.key === "ArrowDown") newIndex++;
                getNewFocus(newIndex);
              }}
            />
          ) : null}

          {item.type === BlockType.IMAGE ? (
            <ImageBlockComponent blockState={item} imageUrl={item.content} />
          ) : null}
        </div>
      ))}
      <TableDataBase />
    </>
  );
};

export default EditDocumentPage;
