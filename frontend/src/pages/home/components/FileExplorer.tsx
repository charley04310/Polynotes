import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Divider,
  List,
  Row,
  Popover,
  Input,
  InputRef,
  Tooltip,
} from "antd";
import {
  FolderOutlined,
  FolderAddOutlined,
  FileAddOutlined,
  FolderFilled,
} from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { HomeOutlined, FileTextOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  newFileNode,
  newFolderNode,
  NodeFileNavigator,
} from "../utils/DataPayload";
import {
  addNode,
  getNode,
  getNodesPath,
} from "../../../store/slices/TreeFileExplorerSlice";
import { createNewPage } from "../../../store/API/Page";
import { useNavigate } from "react-router-dom";
import { navigateToDocumentPage } from "../composables/Navigation";
import EmptyData from "../../../global-components/EmptyData";
import { createOrUpdateTreeFileSystem } from "../../../store/API/FileSystemTree";

interface IPropsFileExplorer {
  treeData: NodeFileNavigator;
  userId?: string;
}

const FileExplorer: React.FC<IPropsFileExplorer> = ({ treeData, userId }) => {
  const [currentNode, setCurrentNode] = useState<NodeFileNavigator>(treeData);
  const [pageTitle, setPageTitle] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [openFileEditor, setopenFileEditor] = useState(false);
  const [updateTreeFile, setUpdateTreeFile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    setCurrentNode(treeData);
  }, [treeData]);
  // Permet de mettre à jour le noeud courant
  useEffect(() => {
    const getNode = (
      rootNode: NodeFileNavigator,
      key: string
    ): NodeFileNavigator | undefined => {
      // si la clé du noeud est égale à la clé recherchée, on retourne le noeud
      if (rootNode.key === key) {
        return rootNode;
      }
      // si le noeud a des enfants, on parcourt les enfants
      if (rootNode.children) {
        for (let child of rootNode.children) {
          const childNode = getNode(child, key);
          if (childNode) {
            return childNode;
          }
        }
      }
      // si on arrive ici, c'est que le noeud n'a pas été trouvé
      return undefined;
    };
    // on récupère le noeud à partir de la clé
    const newNode = getNode(treeData, currentNode.key);
    if (newNode) {
      setCurrentNode(newNode);
    }
  }, [currentNode.key, treeData]);

  // Permet de mettre à jour le store et la base de données lorsque l'on ajoute un noeud
  useEffect(() => {
    if (updateTreeFile) {
      // console.log("update tree file");
      (async () => {
        await createOrUpdateTreeFileSystem(userId!, treeData);
        setUpdateTreeFile(false);
      })();
    }
  }, [updateTreeFile, userId, treeData]);

  const handleOpenChange = () => {
    setPageTitle("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setOpen(!open);
  };

  const handleTitleChange = () => {
    setPageTitle("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setopenFileEditor(!openFileEditor);
  };

  const handleAddNode = async (
    type: string,
    parentNode: NodeFileNavigator,
    nodeToAdd: NodeFileNavigator
  ) => {
    // Si le type est un fichier, on crée une nouvelle page
    if (type === "file" && userId) {
      const page = await createNewPage(userId, pageTitle);
      nodeToAdd.key = page.pageId;
    }
    nodeToAdd.title = pageTitle;
    // On ajoute le noeud au store
    dispatch(addNode({ parentNode, nodeToAdd }));
    // On met à jour la base de données
    setUpdateTreeFile(true);
  };

  return (
    <>
      <Divider />
      <Row align="middle" justify="start">
        <Col span={"auto"}>
          <Breadcrumb style={{ marginRight: 18 }}>
            {getNodesPath(treeData, currentNode.key).map((node, index) => (
              <Breadcrumb.Item key={node.key}>
                <div
                  style={{ cursor: "pointer" }}
                  className={
                    currentNode.key === node.key ? "" : "breadcrumb-item"
                  }
                  onClick={() => {
                    const newNode = getNode(treeData, node.key);
                    if (newNode) {
                      setCurrentNode(newNode);
                    }
                  }}
                >
                  {index === 0 ? (
                    <span>
                      <HomeOutlined style={{ fontSize: 15, marginRight: 5 }} />
                      {node.title}
                    </span>
                  ) : (
                    <span>
                      <FolderOutlined
                        style={{ fontSize: 15, marginRight: 5 }}
                      />
                      {node.title}
                    </span>
                  )}
                </div>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Col>
        <Col span={2}>
          <Divider type="vertical" />

          <Popover
            content={
              <>
                <Input
                  placeholder="Folder name"
                  value={pageTitle}
                  ref={inputRef}
                  onChange={(e) => setPageTitle(e.target.value)}
                />
                <Divider style={{ padding: 0, margin: 12 }} />

                <Button
                  danger
                  onClick={handleOpenChange}
                  style={{ marginRight: 6 }}
                >
                  Annuler
                </Button>
                <Button
                  onClick={() => {
                    handleAddNode("folder", currentNode, newFolderNode);
                    handleOpenChange();
                  }}
                >
                  Ajouter
                </Button>
              </>
            }
            title="Folder name"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Tooltip placement="top" title={"Nouveau dossier"}>
              <Button shape="circle" icon={<FolderAddOutlined />} />
            </Tooltip>
          </Popover>

          <Popover
            content={
              <>
                <Input
                  placeholder="File name"
                  value={pageTitle}
                  ref={inputRef}
                  onChange={(e) => setPageTitle(e.target.value)}
                />
                <Divider style={{ padding: 0, margin: 12 }} />

                <Button
                  danger
                  onClick={handleTitleChange}
                  style={{ marginRight: 6 }}
                >
                  Canceled
                </Button>
                <Button
                  onClick={() => {
                    handleAddNode("file", currentNode, newFileNode);
                    handleTitleChange();
                  }}
                >
                  Add
                </Button>
              </>
            }
            title="New folder"
            trigger="click"
            open={openFileEditor}
            onOpenChange={handleTitleChange}
          >
            <Tooltip placement="top" title={"New File"}>
              <Button
                style={{ marginLeft: 8 }}
                shape="circle"
                icon={<FileAddOutlined style={{ color: "green" }} />}
              />
            </Tooltip>
          </Popover>
        </Col>
      </Row>
      <Divider style={{ marginBottom: 0 }} />
      {currentNode.children && currentNode.children.length > 0 ? (
        <List
          dataSource={currentNode.children}
          renderItem={(item) => (
            <List.Item
              className="list-item-file-explore"
              style={{ paddingLeft: 10 }}
              onClick={() =>
                item.children
                  ? setCurrentNode(item)
                  : navigateToDocumentPage(`/document/${item.key}`, navigate)
              }
            >
              <List.Item.Meta
                style={{ cursor: "pointer" }}
                avatar={
                  <Avatar
                    style={
                      item.children
                        ? {
                            backgroundColor: "transparent",
                            color: "#1890ff",
                            fontSize: 25,
                          }
                        : {
                            backgroundColor: "transparent",
                            color: "#295b9d",
                            fontSize: 25,
                          }
                    }
                    icon={
                      item.children ? <FolderFilled /> : <FileTextOutlined />
                    }
                  />
                }
                title={item.title}
              />
            </List.Item>
          )}
        />
      ) : (
        <EmptyData message={"No Data available"} />
      )}
    </>
  );
};

export default FileExplorer;
