export const setErrorMessage = (error: string, status: number) => {
  return {
    message: undefined,
    error: error,
    status: status,
  };
};

export const setSuccessMessage = (
  message: string,
  status: number
): IReponseSuccess => {
  return {
    message: message,
    error: undefined,
    status: status,
  };
};

export const setLoginSuccesMessage = (
  user: {
    userId: string;
    username: string;
    email: string;
  },
  message: string,
  status: number
): IReponseSuccess => {
  return {
    user: user,
    message: message,
    error: undefined,
    status: status,
  };
};

export interface IReponseSuccess {
  user?: {
    userId: string;
    username: string;
    email: string;
  };
  message: string;
  error: undefined;
  status: number;
}
export interface IReponseError {
  message: undefined;
  error: string;
  status: number;
}
