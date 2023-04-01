import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NodeFileNavigator,
  treeDataInitialState,
} from "../../pages/home/utils/DataPayload";
import { v4 as uuidv4 } from "uuid";

export const getNode = (
  node: NodeFileNavigator,
  key: string
): NodeFileNavigator | undefined => {
  if (node.key === key) {
    return node;
  }
  for (const child of node.children || []) {
    const found = getNode(child, key);
    if (found) {
      return found;
    }
  }
  return undefined;
};
export const getNodesPath = (
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

interface AddNodePayload {
  parentNode: NodeFileNavigator;
  nodeToAdd: NodeFileNavigator;
}

const TreeFileStructure = createSlice({
  name: "TreeFileStructure",
  initialState: treeDataInitialState,
  reducers: {
    addNode: (state, action: PayloadAction<AddNodePayload>) => {
      const { parentNode, nodeToAdd } = action.payload;

      let nodeToAddCopy;

      if (!nodeToAdd.children) {
        nodeToAddCopy = {
          title: nodeToAdd.title,
          key: nodeToAdd.key,
        };
      } else {
        nodeToAddCopy = {
          title: nodeToAdd.title,
          key: uuidv4(),
          children: nodeToAdd.children,
        };
      }
      // console.log("node to add ", nodeToAddCopy);

      // Find the parent node
      const parent = getNode(state, parentNode.key);
      if (parent) {
        parent.children = [...(parent.children || []), nodeToAddCopy];
      }

      //      console.log("state", JSON.parse(JSON.stringify(state)));
      //  console.log("state", JSON.parse(JSON.stringify(state)));
      return state;
    },
    setStore: (state, action: PayloadAction<NodeFileNavigator>) => {
      const { title, key, children } = action.payload;
      // console.log("action.payload", action.payload);
      return {
        title,
        key,
        children,
      };
    },
  },
});

export const { addNode, setStore } = TreeFileStructure.actions;

export default TreeFileStructure.reducer;
