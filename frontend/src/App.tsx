import { ConfigProvider } from "antd";
import React from "react";

import PolynoteRouter from "./router/router";

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#295b9d",
          colorText: "#516d91",
          colorBgContainer: "#f0f2f5",
        },
      }}
    >
      <PolynoteRouter />
    </ConfigProvider>
  );
};

export default App;
