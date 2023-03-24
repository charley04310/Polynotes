import { IServerResponse } from "../../App";
import { api } from "../axios/config";
import {
  setErrorMessage,
  setSuccessMessage,
  setLoginSuccesMessage,
} from "./SuccessErrorMessage";
export interface IUser {
  username: string;
  password: string;
  email: string;
}

export const registerUser = async (data: IUser) => {
  try {
    const response = await api.post("/auth/signup", {
      username: data.username,
      password: data.password,
      email: data.email,
    });
    return setSuccessMessage(response.data, response.status);
  } catch (err: any) {
    return setErrorMessage(err.response.data.message, err.response.status);
  }
};
export const loginUser = async (data: any) => {
  try {
    const response = await api.post("/auth/login", {
      password: data.password,
      email: data.email,
    });
    return setLoginSuccesMessage(
      response.data.user,
      response.data.message,
      response.status
    );
  } catch (err: any) {
    setErrorMessage(err.response.data.message, err.response.status);
  }
};
export const autoLogin = async (): Promise<IServerResponse> => {
  try {
    const response = await api.get("/auth/auto-login");

    return setLoginSuccesMessage(
      response.data.user,
      response.data.message,
      response.status
    );
  } catch (err: any) {
    return setErrorMessage(err.response.data.message, err.response.status);
  }
};
export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");

    return setSuccessMessage(response.data, response.status);
  } catch (err: any) {
    return setErrorMessage(err.response.data.message, err.response.status);
  }
};
