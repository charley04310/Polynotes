import { v4 as uuidv4 } from "uuid";
export const treeDataInitialState: NodeFileNavigator = {
  title: "Home",
  key: uuidv4(),
  children: [],
};

export const newFolderNode: NodeFileNavigator = {
  title: "New folder",
  key: uuidv4(),
  children: [],
};

export const newFileNode: NodeFileNavigator = {
  title: "New file",
  key: uuidv4(),
};

export interface NodeFileNavigator {
  title: string;
  key: string;
  children?: NodeFileNavigator[];
}
