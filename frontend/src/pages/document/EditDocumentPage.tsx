import { useRef, useState } from "react";
import { Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ModalEditDocument from "./components/ModalEditDocument";
import "./index.css";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import Tiptap from "./components/EditorContent";
import { Editor } from "@tiptap/react";
import { BlockState, BlockType } from "./interfaces/documents";
import ImageBlockComponent from "./components/ImageBlock";

const EditDocumentPage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);
  const refs = useRef<(Editor | null)[]>([]);

  const blocksPage: BlockState[] = useSelector(
    (state: RootState) => state.blocks
  );

  const handleModal = (index: number) => {
    console.log("open");
    setCurrentBlockIndex(index);
    refs.current[index]?.chain().focus().run();
    setIsModalVisible(true);
  };

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
          <Button
            type="link"
            shape="default"
            className="moreOptionsButton"
            icon={<MoreOutlined style={{ fontSize: "20px" }} />}
            size={"large"}
            onClick={() => handleModal(index)}
          />
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
      <ModalEditDocument
        refs={refs.current}
        currentBlockIndex={currentBlockIndex}
      />
    </>
  );
};

export default EditDocumentPage;
