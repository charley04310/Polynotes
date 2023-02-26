import { useEffect, useState, useRef } from "react";
import { Button} from "antd";
import { MoreOutlined} from "@ant-design/icons";
import { initBlockEditor} from "./utils/style";
import ModalEditDocument from "./components/ModalEditDocument";
import { HandleKeyDown } from "./utils/handleKeyDown";

import "./index.css";

const EditDocumentPage = () => {

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentBlockID, setCurrentBlockID] = useState<string>("");
  const [contents, setContents] = useState([initBlockEditor]);
  const newDivRef = useRef<HTMLDivElement>(null);

  const handleModal = (id: string) => {
    setCurrentBlockID(id);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (newDivRef.current) {
      newDivRef.current.scrollIntoView({ behavior: "smooth" });
      newDivRef.current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(newDivRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [contents]);

  return (
    <>
      {contents.map((item, index) => (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="link"
              shape="default"
              className="moreOptions"
              icon={<MoreOutlined />}
              size={"large"}
              onClick={() => handleModal(item.id)}
            />
            <div
              ref={index === contents.length - 1 ? newDivRef : null}
              className="editable"
              key={item.id}
              style={{ ...item.style, caretColor: "black", width: "90%" }}
              contentEditable={true}
              onKeyDown={(event) =>
                HandleKeyDown(
                  event,
                  isModalVisible,
                  contents,
                  setContents,
                  setIsModalVisible
                )
              }
            >
              {item.content}
            </div>
          </div>
        </>
      ))}
      <ModalEditDocument
        visible={isModalVisible}
        currentBlockID={currentBlockID}
        contents={contents}
        setContents={setContents}
        setIsModalVisible={setIsModalVisible}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default EditDocumentPage;
