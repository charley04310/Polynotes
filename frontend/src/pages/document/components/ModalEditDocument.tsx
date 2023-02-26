import { Modal, Space, Button } from "antd";
import { FontSizeOutlined } from "@ant-design/icons";
import { setCustomContent } from "../utils/style";
import { Dispatch, SetStateAction } from "react";
import { ITextBlock } from "../interfaces/documents";

interface CustomModalProps {
  visible: boolean;
  contents: ITextBlock[];
  currentBlockID: string;
  setContents: Dispatch<SetStateAction<ITextBlock[]>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
}

const buttonsTitleData = [
  {
    title: "Titre 1",
    size: "50px",
  },
  {
    title: "Titre 2",
    size: "35px",
  },
  {
    title: "Titre 3",
    size: "25px",
  },
  {
    title: "Paragraph",
    size: "15px",
  },
];

const ModalEditDocument: React.FC<CustomModalProps> = ({
  visible,
  contents,
  currentBlockID,
  setContents,
  setIsModalVisible,
  onCancel,
}) => {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      title="Personnaliser le texte"
      okButtonProps={{ style: { display: "none" } }}
      cancelText="Annuler"
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {buttonsTitleData.map((button, index) => (
          <Button
            key={index}
            type="text"
            icon={<FontSizeOutlined />}
            size={"large"}
            block
            style={{ fontWeight: "bold", textAlign: "left" }}
            onClick={() =>
              setCustomContent(
                currentBlockID,
                {
                  bold: "300",
                  size: button.size,
                  border: "0px",
                  color: "black",
                },
                contents,
                setContents,
                setIsModalVisible
              )
            }
          >
            {button.title}
          </Button>
        ))}
      </Space>
    </Modal>
  );
};

export default ModalEditDocument;
