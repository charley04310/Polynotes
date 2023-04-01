import { Input, Select, Collapse, Menu, Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { buildMenuData, getItem, MenuItem } from "../../../layout/Layout";
import { FileOutlined, FolderOutlined, InboxOutlined } from "@ant-design/icons";
import { RootState } from "../../../store/store";
import { NodeFileNavigator } from "../../home/utils/DataPayload";
import { BlockType, IContentBlock } from "../../../store/interfaces/block";
import { getPageByid, updatePageContent } from "../../../store/API/Page";
import { setBlockContent } from "../../../store/slices/blockSlice";
import Tiptap from "./EditorContent";
import { Editor } from "@tiptap/react";
import ImageBlockComponent from "./ImageBlock";
import TableDataBase from "./DataBaseTable";
import { TrelloDataBase } from "./TrelloDataBase";

const { Panel } = Collapse;

const { Search } = Input;
export function buildSubPageMenuData(
  data: NodeFileNavigator[] | undefined
): MenuItem[] {
  if (!data) return [];
  return data.map((node) => {
    if (node.children) {
      return getItem(
        node.title,
        node.key,
        <FolderOutlined />,
        buildSubPageMenuData(node.children)
      );
    } else {
      return getItem(
        <Button type="text">{node.title}</Button>,
        node.key,
        <FileOutlined />,
        undefined
      );
    }
  });
}
const buildTreeSubPageMenuData = (treeData: NodeFileNavigator) => {
  const menuData = buildSubPageMenuData(treeData.children);
  return getItem("Workspace", "sub4", <InboxOutlined />, menuData);
};
interface SubPagePropsBlock {
  dataSource: IContentBlock;
  index: number;
}

const SubPageBlockComponent: React.FC<SubPagePropsBlock> = ({
  dataSource,
  index,
}) => {
  const dispatch = useDispatch();
  const treeData = useSelector((state: RootState) => state.Tree);
  const refs = useRef<(Editor | null)[]>([]);
  const [pageIsSelected, setpageIsSelected] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("");

  useEffect(() => {
    if (Array.isArray(dataSource.content))
      setDocumentTitle(dataSource.content[0].content.slice(4, -5));
  }, [dataSource.content]);

  const handleSelectedSubPage = async (value: any) => {
    const subpage = await getPageByid(value.key);
    console.log("Datasrouce : ", subpage);
    setDocumentTitle(subpage.title);
    dispatch(
      setBlockContent({
        item: dataSource,
        content: subpage.content,
      })
    );
  };
  const onChange = (key: string | string[]) => {
    setpageIsSelected(true);
    console.log(key);
  };
  const handleDelete = () => {
    /*     console.log("delete");
    dispatch(
      setBlockContent({
        item: blockState,
        content: "",
      })
    ); */
  };
  const MenuAuthAccess = (): MenuItem[] => {
    return [buildTreeSubPageMenuData(treeData)];
  };

  return (
    <>
      {Array.isArray(dataSource.content) ? (
        <Collapse
          defaultActiveKey={["1"]}
          onChange={onChange}
          style={{ width: "100%" }}
        >
          <Panel header={documentTitle.toUpperCase()} key="1">
            {dataSource.content.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="block"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {item.type === BlockType.TIPTAP ? (
                    <Tiptap
                      isEditable={false}
                      blockState={item}
                      ref={(ref) => {
                        refs.current[index] = ref;
                      }}
                    />
                  ) : null}

                  {item.type === BlockType.IMAGE &&
                  typeof item.content === "string" ? (
                    <ImageBlockComponent
                      isEditable={false}
                      blockState={item}
                      imageUrl={item.content}
                    />
                  ) : null}
                  {item.type === BlockType.DATABASE ? (
                    <TableDataBase
                      isSubPage={true}
                      isEditable={false}
                      dataSource={item}
                      index={index}
                    />
                  ) : null}

                  {item.type === BlockType.TRELLO &&
                  typeof item.content != "string" ? (
                    <TrelloDataBase
                      isSubPage={true}
                      isEditable={false}
                      dataSource={item}
                      index={index}
                    />
                  ) : null}
                </div>
              );
            })}
          </Panel>
        </Collapse>
      ) : (
        <Menu
          style={{
            border: "1px solid #8080802e",
            borderRadius: "5px",
            width: "50%",
          }}
          onClick={(e) => handleSelectedSubPage(e)}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          theme="light"
          mode="inline"
          items={MenuAuthAccess()}
        />
      )}
    </>
  );
};

export default SubPageBlockComponent;
