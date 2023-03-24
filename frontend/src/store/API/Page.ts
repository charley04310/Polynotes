import { api } from "../axios/config";
import { setErrorMessage, setSuccessMessage } from "./SuccessErrorMessage";
import { v4 as uuidv4 } from "uuid";
import { BlockType } from "../interfaces/block";
import { Params } from "react-router-dom";

export const createNewPage = async (userId: string) => {
  try {
    const response = await api.post("/page/add", {
      title: "Default Title",
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

export const getPages = async () => {
  try {
    const response = await api.get("/page/all");
    return setSuccessMessage(response.data, response.status);
  } catch (err: any) {
    return setErrorMessage(err.response.data.message, err.response.status);
  }
};

export const getPageByid = async (id: string): Promise<IResponsePage> => {
  try {
    const response = await api.get(`/page/${id}`);
    return {
      title: response.data.title,
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
): Promise<IResponsePage> => {
  try {
    console.log("content:",content);
    const response = await api.patch(`/page/${id}`, {
      content: content,
    });
    return {
      title: response.data.title,
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

export const updateAllPageContent = async (
  id: string,
  content: any,
  title: string
): Promise<any> => {
  return "test";
};

export interface IResponsePage {
  title?: string;
  content?: any;
  error?: string;
}
