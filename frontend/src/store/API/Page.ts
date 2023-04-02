import { api } from "../axios/config";
import { setErrorMessage, setSuccessMessage } from "./SuccessErrorMessage";
import { v4 as uuidv4 } from "uuid";
import { BlockType } from "../interfaces/block";

export const createNewPage = async (userId: string, title?: string) => {
  try {
    if (!title) title = "New Page";
    const response = await api.post("api/page/add", {
      title: title,
      userId: userId,
      parent: null,
      content: [
        {
          id: uuidv4(),
          type: BlockType.TIPTAP,
          ref: null,
          content: "<h1></h1>",
        },
        {
          id: uuidv4(),
          type: BlockType.TIPTAP,
          ref: null,
          content: "",
        },
      ],
    });
    return {
      message: response.data,
      pageId: response.data._id,
    };
  } catch (err: any) {
    return {
      message: err.response.data.message,
      pageId: undefined,
    };
  }
};
export const updatePrivacyPage = async (
  pageId: string,
  isPublic: boolean,
  isEditablePage: boolean
): Promise<any> => {
  const response = await api.patch(`api/page/privacy/${pageId}`, {
    isPublic: isPublic,
    isEditable: isEditablePage,
  });

  return response.data;
};

export const getPages = async () => {
  try {
    const response = await api.get("api/page/all");
    return setSuccessMessage(response.data, response.status);
  } catch (err: any) {
    return setErrorMessage(err.response.data.message, err.response.status);
  }
};

export const getPageByid = async (id: string): Promise<IResponsePage | any> => {
  try {
    const response = await api.get(`api/page/${id}`);
    // console.log("response:", response.data);
    return {
      title: response.data.title,
      isPublic: response.data.isPublic,
      isEditable: response.data.isEditable,
      error: undefined,
      content: response.data.content,
    };
  } catch (err: any) {
    return {
      title: undefined,
      error: err.response.data.message,
      content: undefined,
    };
  }
};

export const updatePageContent = async (
  id: string,
  content: any
): Promise<IResponsePage | any> => {
  try {
    // console.log("content:", content);
    const response = await api.patch(`api/page/${id}`, {
      content: content,
    });
    return {
      title: response.data.title,
      isPublic: response.data.isPublic,
      isEditable: response.data.isEditable,
      error: undefined,
      content: response.data.content,
    };
  } catch (err: any) {
    return {
      title: undefined,
      error: err.response.data.message,
      content: undefined,
    };
  }
};

export const updDateTitlePage = async (
  id: string,
  title: string
): Promise<any> => {
  const response = await api.patch(`api/page/title/${id}`, {
    id: id,
    title: title,
  });
  return response.data;
};

export const getPagesByUserId = async (userId: string) => {
  const response = await api.get(`api/page/user/${userId}`);
  return response.data;
};

export interface IResponsePage {
  title?: string;
  isPublic: boolean;
  isEditable: boolean;
  content?: any;
  error?: string;
}
