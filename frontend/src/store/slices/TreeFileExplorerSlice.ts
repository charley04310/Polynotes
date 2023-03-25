import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NodeFileNavigator,
  treeDataInitialState,
} from "../../pages/home/utils/DataPayload";
import { v4 as uuidv4 } from "uuid";

const getNode = (
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

      return state;
    },
  },
});

export const { addNode } = TreeFileStructure.actions;

export default TreeFileStructure.reducer;
