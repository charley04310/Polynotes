import { useEffect, useRef } from "react";
import "./index.css";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import Tiptap from "./components/EditorContent";
import { Editor } from "@tiptap/react";
import { IBlockState, BlockType } from "../../store/interfaces/block";
import ImageBlockComponent from "./components/ImageBlock";
import DropDownMenu from "./components/DropDownMenu";
import TableDataBase from "./components/DataBaseTable";
import { TrelloDataBase } from "./components/TrelloDataBase";

const EditDocumentPage = () => {
  const refs = useRef<(Editor | null)[]>([]);

  const blocksPage: IBlockState[] = useSelector(
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

          {item.type === BlockType.IMAGE && typeof item.content === "string" ? (
            <ImageBlockComponent blockState={item} imageUrl={item.content} />
          ) : null}
          {item.type === BlockType.DATABASE ? (
            <TableDataBase dataSource={item} index={index} />
          ) : null}

          {item.type === BlockType.TRELLO && typeof item.content != "string" ? (
            <TrelloDataBase dataSource={item} index={index} />
          ) : null}
        </div>
      ))}
    </>
  );
};

export default EditDocumentPage;
