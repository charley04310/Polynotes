import React, { useEffect, useState } from "react";
import { Avatar, List } from "antd";
import { FolderOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export interface NodeFileNavigator {
  title: string;
  key: string;
  children?: NodeFileNavigator[];
}

interface IPropsFileExplorer {
  treeData: NodeFileNavigator;
}

const items = [
  {
    href: "Application",
    title: <HomeOutlined />,
  },
  {
    href: "User",
    title: (
      <>
        <UserOutlined />
        <span>Application List</span>
      </>
    ),
  },
];

const FileExplorer: React.FC<IPropsFileExplorer> = ({ treeData }) => {
  const [currentNode, setCurrentNode] = useState<NodeFileNavigator>(treeData);

  useEffect(() => {
    setCurrentNode(treeData);
  }, [treeData]);

  const getNode = (
    rootNode: NodeFileNavigator,
    key: string
  ): NodeFileNavigator | undefined => {
    // If the node's key matches the search key, return the node
    if (rootNode.key === key) {
      return rootNode;
    }

    // If the node has children, recursively search them for the key
    if (rootNode.children) {
      for (let child of rootNode.children) {
        const childNode = getNode(child, key);
        if (childNode) {
          return childNode;
        }
      }
    }

    // If the node has no children and its key does not match the search key, return undefined
    return undefined;
  };

  const getNodesPath = (
    rootNode: NodeFileNavigator,
    key: string
  ): { key: string; title: string }[] => {
    // If the node's key matches the search key, return an object with its key and title properties in a new array
    if (rootNode.key === key) {
      return [{ key: rootNode.key, title: rootNode.title }];
    }

    // If the node has children, recursively search them for the key
    if (rootNode.children) {
      for (let child of rootNode.children) {
        const childTitles = getNodesPath(child, key);
        if (childTitles.length > 0) {
          // If the child has the matching key, add its object to the list and return it
          return [{ key: rootNode.key, title: rootNode.title }, ...childTitles];
        }
      }
    }

    return [];
  };

  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }}>
        {getNodesPath(treeData, currentNode.key).map((node, index) => (
          <Breadcrumb.Item key={node.title}>
            <div
              style={{ cursor: "pointer" }}
              className={currentNode.key === node.key ? "" : "breadcrumb-item"}
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
                  <FolderOutlined style={{ fontSize: 15, marginRight: 5 }} />
                  {node.title}
                </span>
              )}
            </div>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <div
        id="scrollableDiv"
        style={{
          height: "auto",
          overflow: "auto",
        }}
      >
        <List
          dataSource={currentNode.children}
          renderItem={(item) => (
            <List.Item
              className="list-item-file-explore"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 6,
              }}
              onClick={() => setCurrentNode(item)}
            >
              <List.Item.Meta
                style={{ cursor: "pointer" }}
                avatar={
                  <Avatar
                    icon={
                      item.children ? <FolderOutlined /> : <FileTextOutlined />
                    }
                  />
                }
                title={item.title}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default FileExplorer;
