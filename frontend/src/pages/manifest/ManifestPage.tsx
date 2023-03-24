import { useMemo, useState } from "react";
import RegisterPage from "../auth/RegisterPage";
import LoginPage from "../auth/LoginPage";
import WelcomePage from "../auth/WelcomePage";
import React from "react";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setUser } from "../../store/slices/authSlice";

const Context = React.createContext({ name: "Default" });
const ManifestPage = () => {
  const [pageState, setPageState] = useState("welcome");
  const dispatch = useDispatch();
  const handleStateChange = (newState: string) => {
    setPageState(newState);
  };
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  const [api, contextHolder] = notification.useNotification();

  const registerNotificationMessage = (userSaved: any) => {
    if (userSaved.message === undefined) {
      api.error({
        message: userSaved.error,
        placement: "topLeft",
      });
    } else {
      api.success({
        message: userSaved.message,
        placement: "topLeft",
      });
      setPageState("login");
    }
  };

  const loginNotificationMessage = (userLoginResponse: any) => {
    if (userLoginResponse.message === undefined) {
      api.error({
        message: userLoginResponse.error,
        placement: "topLeft",
      });
    } else {
      api.success({
        message: userLoginResponse.message,
        placement: "topLeft",
      });

      dispatch(setIsAuthenticated(true));
      dispatch(setUser(userLoginResponse.user));
    }
  };

  return (
    <>
      <Context.Provider value={contextValue}>{contextHolder}</Context.Provider>
      <div
        style={{
          minHeight: "100%",
        }}
      >
        {pageState === "welcome" && (
          <WelcomePage onPageStateChange={handleStateChange} />
        )}
        {pageState === "register" && (
          <RegisterPage
            setNotification={registerNotificationMessage}
            onPageStateChange={handleStateChange}
          />
        )}
        {pageState === "login" && (
          <LoginPage
            setNotification={loginNotificationMessage}
            onPageStateChange={handleStateChange}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        ></div>
      </div>
    </>
  );
};

export default ManifestPage;
