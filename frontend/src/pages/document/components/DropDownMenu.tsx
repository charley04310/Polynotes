import { FontSizeOutlined, FileImageOutlined } from "@ant-design/icons";
import React from "react";
import {
  MoreOutlined,
  DeleteOutlined,
  DatabaseOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import { Button, MenuProps } from "antd";
import { Dropdown } from "antd";
import { Editor } from "@tiptap/react";
import { useDispatch } from "react-redux";
import { deleteBlock, setNewBlock } from "../../../store/slices/blockSlice";
import { IBlockState, BlockType } from "../../../store/interfaces/block";

interface DropDownProps {
  editor: Editor | null;
  item: IBlockState;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum Level {
  H1 = 1,
  H2 = 2,
  H3 = 3,
}

const DropDownMenu: React.FC<DropDownProps> = ({
  editor,
  item,
  setUpdateData,
}) => {
  const dispatch = useDispatch();

  const setNewDataBase = () => {
    dispatch(
      setNewBlock({
        type: BlockType.DATABASE,
        content: {
          columns: [],
          rows: [],
          trello: {
            columnsTrello: ["Default"],
            columnsTrelloStyle: [
              {
                background: "#001529",
              },
            ],
            rowsTrello: [],
          },
        },
        id: item.id,
      })
    );

    setUpdateData(true);
  };
  const toggleHeading = (level: Level) => {
    editor?.commands.toggleHeading({ level: level });
    setUpdateData(true);
  };
  const removeBlock = async () => {
    dispatch(deleteBlock({ id: item.id }));
    setUpdateData(true);
  };
  const setImageBlock = () => {
    dispatch(setNewBlock({ type: BlockType.IMAGE, content: "", id: item.id }));
    setUpdateData(true);
  };
  const setParagraphBlock = () => {
    dispatch(setNewBlock({ type: BlockType.TIPTAP, content: "", id: item.id }));
  };

  const items: MenuProps["items"] = [
    {
      label: "Titre 1",
      icon: <FontSizeOutlined />,
      key: "0",
      onClick: () => toggleHeading(Level.H1),
    },
    {
      label: "Titre 2",
      icon: <FontSizeOutlined />,
      key: "1",
      onClick: () => toggleHeading(Level.H2),
    },
    {
      label: "Titre 3",
      icon: <FontSizeOutlined />,
      key: "2",
      onClick: () => toggleHeading(Level.H3),
    },
    {
      type: "divider",
    },
    {
      label: "Image",
      icon: <FileImageOutlined />,
      key: "3",
      onClick: () => setImageBlock(),
    },
    {
      label: "Database",
      icon: <DatabaseOutlined />,
      key: "4",
      onClick: () => setNewDataBase(),
    },
    {
      label: "Block Paragraphe",
      icon: <BlockOutlined />,
      key: "5",
      onClick: () => setParagraphBlock(),
    },
    {
      type: "divider",
    },

    {
      label: "Supprimer le block",
      icon: <DeleteOutlined />,
      key: "6",
      danger: true,
      onClick: () => removeBlock(),
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
