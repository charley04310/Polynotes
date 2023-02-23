import React from "react";
import { Button } from "antd";
import { Col, Row } from "antd";
import { useState } from "react";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import WelcomePage from "../pages/auth/WelcomePage";

const ManifestPage = () => {
  const [pageState, setPageState] = useState("welcome");

  const handleStateChange = (newState: string) => {
    setPageState(newState);
  };

  return (
    <>
      <div
        style={{
          minHeight: "100%",
        }}
      >
        {pageState === "welcome" && (
          <WelcomePage onPageStateChange={handleStateChange} />
        )}
        {pageState === "register" && (
          <RegisterPage onPageStateChange={handleStateChange} />
        )}
        {pageState === "login" && (
          <LoginPage onPageStateChange={handleStateChange} />
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
