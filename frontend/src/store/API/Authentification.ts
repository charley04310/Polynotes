import { api } from "../axios/config";
import {
  setErrorMessage,
  setSuccessMessage,
  setLoginSuccesMessage,
  IReponseSuccess,
  IReponseError,
} from "./SuccessErrorMessage";
export interface IUser {
  username: string;
  password: string;
  email: string;
}
export interface ILoginUser {
  password: string;
  email: string;
}
export const registerUser = async (
  data: IUser
): Promise<IReponseSuccess | IReponseError> => {
  try {
    const response = await api.post("api/auth/signup", {
      username: data.username,
      password: data.password,
      email: data.email,
    });
    console.log("register TEST", response)

    return setSuccessMessage(response.data, response.status);
  } catch (err: any) {
    return setErrorMessage(err.response.data.message, err.response.status);
  }
};
export const loginUser = async (data: ILoginUser) => {
  try {
    const response = await api.post("api/auth/login", {
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
export const autoLogin = async (): Promise<IReponseSuccess | IReponseError> => {
  try {
    const response = await api.get("api/auth/auto-login");

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
    const response = await api.post("api/auth/logout");

    return setSuccessMessage(response.data, response.status);
  } catch (err: any) {
    return setErrorMessage(err.response.data.message, err.response.status);
  }
};
