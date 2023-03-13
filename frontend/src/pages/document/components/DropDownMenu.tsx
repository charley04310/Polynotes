import { FontSizeOutlined, FileImageOutlined } from "@ant-design/icons";
import React from "react";
import {
  MoreOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { Button, MenuProps } from "antd";
import { Dropdown } from "antd";
import { Editor } from "@tiptap/react";
import { useDispatch } from "react-redux";
import { deleteBlock, setNewBlock } from "../../../store/slices/blockSlice";
import { BlockState, BlockType } from "../interfaces/documents";

interface DropDownProps {
  editor: Editor | null;
  item: BlockState;
}

const DropDownMenu: React.FC<DropDownProps> = ({ editor, item }) => {
  const dispatch = useDispatch();

  const items: MenuProps["items"] = [
    {
      label: "Titre 1",
      icon: <FontSizeOutlined />,
      key: "0",
      onClick: () => editor?.commands.toggleHeading({ level: 1 }),
    },
    {
      label: "Titre 2",
      icon: <FontSizeOutlined />,
      key: "1",
      onClick: () => editor?.commands.toggleHeading({ level: 2 }),
    },
    {
      label: "Titre 3",
      icon: <FontSizeOutlined />,
      key: "2",
      onClick: () => editor?.commands.toggleHeading({ level: 3 }),
    },
    {
      type: "divider",
    },
    {
      label: "Image",
      icon: <FileImageOutlined />,
      key: "3",
      onClick: () =>
        dispatch(
          setNewBlock({ type: BlockType.IMAGE, content: "", id: item.id })
        ),
    },
    {
      label: "Check Box",
      icon: <CheckSquareOutlined />,
      key: "4",
      onClick: () =>
        dispatch(
          setNewBlock({ type: BlockType.IMAGE, content: "", id: item.id })
        ),
    },
    {
      type: "divider",
    },
    {
      label: "Supprimer le block",
      icon: <DeleteOutlined />,
      key: "5",
      danger: true,
      onClick: () => dispatch(deleteBlock({ id: item.id })),
    },
  ];

  return (
    <Dropdown
      overlayClassName="DropDownMenu"
      overlayStyle={{
        top: 205,
        width: 250,
        color: "white",
      }}
      menu={{ items }}
      trigger={["click"]}
    >
      <Button
        type="link"
        shape="default"
        className="moreOptionsButton"
        icon={<MoreOutlined style={{ fontSize: "20px" }} />}
        size={"large"}
      />
    </Dropdown>
  );
};

export default DropDownMenu;
