import { Modal, Space, Button } from "antd";
import {
  FontSizeOutlined,
  VerticalAlignMiddleOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { Editor } from "@tiptap/react";

interface CustomModalProps {
  currentBlockIndex: number;
  refs: (Editor | null)[];
}
enum Level {
  H1 = 1,
  H2 = 2,
  H3 = 3,
  PARAGRAPHE = 4,
  SEPARATEUR = 5,
}
const buttonsTitleData = [
  {
    title: "Titre 1",
    level: 1,
    size: "50px",
    icon: <FontSizeOutlined />,
    border: "0px",
  },
  {
    title: "Titre 2",
    level: 2,
    size: "35px",
    icon: <FontSizeOutlined />,
    border: "0px",
  },
  {
    title: "Titre 3",
    level: 3,
    size: "25px",
    icon: <FontSizeOutlined />,
    border: "0px",
  },
  {
    title: "Séparateur",
    level: 5,
    size: "0px",
    icon: <VerticalAlignMiddleOutlined />,
    border: "2px",
  },
];

const ModalEditDocument: React.FC<CustomModalProps> = ({
  currentBlockIndex,
  refs,
}) => {
  const setHeaderPage = (level: Level) => {
    if (level <= Level.H3) {
      refs[currentBlockIndex]?.commands.toggleHeading({ level: level });
    } else {
      refs[currentBlockIndex]?.commands.toggleHeading({ level: level });
    }
  };

  return (
    <Modal
      title="Personnaliser le BLOCK"
      okButtonProps={{ style: { display: "none" } }}
      cancelText="Annuler"
      key={uuidv4()}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {buttonsTitleData.map((button, index) => (
          <Button
            key={index}
            type="text"
            icon={button.icon}
            size={"large"}
            block
            style={{ fontWeight: "bold", textAlign: "left" }}
            onClick={() => setHeaderPage(button.level)}
          >
            {button.title}
          </Button>
        ))}
        {/*  <Button
          type="text"
          icon={<UnorderedListOutlined />}
          size={"large"}
          block
          style={{ fontWeight: "bold", textAlign: "left" }}
          onClick={() =>
            setHeaderPage(
              currentBlockID,
              "checkbox",
              {
                bold: "bold",
                size: "15px",
                border: "0px",
                color: "black",
              },
              contents,
              setContents,
              setIsModalVisible
            )
          }
        >
          Liste de tache
        </Button> */}
      </Space>
    </Modal>
  );
};

export default ModalEditDocument;
