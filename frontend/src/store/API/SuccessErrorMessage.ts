export const setErrorMessage = (error: string, status: number) => {
  return {
    message: undefined,
    error: error,
    status: status,
  };
};

export const setSuccessMessage = (message: string, status: number) => {
  return {
    message: message,
    error: undefined,
    status: status,
  };
};

export const setLoginSuccesMessage = (
  user: {},
  message: string,
  status: number
) => {
  return {
    user: user,
    message: message,
    error: undefined,
    status: status,
  };
};
