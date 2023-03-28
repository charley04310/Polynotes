import { NodeFileNavigator } from "../../pages/home/utils/DataPayload";
import { api } from "../axios/config";
import {
  IReponseError,
  IReponseSuccess,
  setErrorMessage,
  setSuccessMessage,
} from "./SuccessErrorMessage";

export const createOrUpdateTreeFileSystem = async (
  userId: string,
  treeData: NodeFileNavigator
): Promise<IReponseSuccess | IReponseError> => {
  try {
    console.log("treeData API REQUEST", treeData);
    const response = await api.post("/file-system/tree/create-or-update", {
      userId: userId,
      title: treeData.title,
      key: treeData.key,
      children: treeData.children,
    });
    return setSuccessMessage(response.data, response.status);
  } catch (err: any) {
    return setErrorMessage(err.response.data.message, err.response.status);
  }
};

export const getTreeFileSystem = async (
  userId: string
): Promise<NodeFileNavigator | undefined> => {
  try {
    const response = await api.get(`/file-system/tree/${userId}`);
    console.log("response.data", response);
    return {
      title: response.data.title,
      key: response.data.key,
      children: response.data.children,
    };
  } catch (err: any) {
    return undefined;
  }
};
