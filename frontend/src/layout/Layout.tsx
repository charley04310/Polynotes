import React, { useEffect, useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { autoLogin, logoutUser } from "../store/API/Authentification";
import { setIsAuthenticated, setUser } from "../store/slices/authSlice";
import { Colors } from "../assets/colors";
import { IServerResponse } from "../App";

const { Content, Footer, Sider } = Layout;

export type MenuItem = Required<MenuProps>["items"][number];

export type MainLayoutProps = {
  children: React.ReactNode;
};

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  to?: string, // new 'to' prop added for the link
  icon?: React.ReactNode,
  method = () => {}
): MenuItem {
  return {
    key,
    icon,
    onClick: async () => method(),
    label: <Link to={to || ""}>{label}</Link>,
  } as MenuItem;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const userAutoLogin = async (): Promise<IServerResponse> => {
    const userLogedIn = await autoLogin();
    return userLogedIn;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const isLoggedIn = await userAutoLogin();
      if (isLoggedIn.message === undefined) return;
      dispatch(setIsAuthenticated(true));
      dispatch(setUser(isLoggedIn.user));
    })();
  });
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const MenuAuthAccess = (): MenuItem[] => {
    const isAuthenticated = useSelector(
      (state: RootState) => state.auth.isAuthenticated
    );
    return !isAuthenticated
      ? [
          getItem(
            "Acceuil",
            "acceuil",
            "/authentification",
            <PieChartOutlined />
          ),
          //getItem("Récent", "recent", "/recent", <DesktopOutlined />),
        ]
      : [
          getItem("Acceuil", "acceuil", "/", <PieChartOutlined />),
          getItem(
            "My Workspace",
            "workspace",
            "/workspace",
            <PieChartOutlined />
          ),
          getItem(
            "Deconnexion",
            "logout",
            undefined,
            <PieChartOutlined />,
            logOutUser
          ),
        ];
  };

  const logOutUser = async () => {
    const userLogout = await logoutUser();
    if (userLogout.message !== undefined) {
      dispatch(setIsAuthenticated(false));
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            margin: 16,
          }}
        >
          <img src={logo} alt="polynote-logo" style={{ width: "100%" }} />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["acceuil"]}
          mode="inline"
          items={MenuAuthAccess()}
        />
      </Sider>
      <Layout className="site-layout" style={{ background: "#131629" }}>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="App"
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", background: "#131629" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
