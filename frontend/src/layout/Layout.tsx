import React, { useState } from "react";
import {
  FileOutlined,
  FolderOutlined,
  InboxOutlined,
  HomeOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logoutUser } from "../store/API/Authentification";
import { setIsAuthenticated } from "../store/slices/authSlice";

import { NodeFileNavigator } from "../pages/home/utils/DataPayload";

const { Content, Footer, Sider } = Layout;

export type MenuItem = Required<MenuProps>["items"][number];

export type MainLayoutProps = {
  children: React.ReactNode;
};

export function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: label,
  } as MenuItem;
}

export function buildMenuData(
  data: NodeFileNavigator[] | undefined
): MenuItem[] {
  if (!data) return [];
  return data.map((node) => {
    if (node.children) {
      return getItem(
        node.title,
        node.key,
        <FolderOutlined />,
        buildMenuData(node.children)
      );
    } else {
      return getItem(
        <Link to={`/document/${node.key}`}>{node.title}</Link>,
        node.key,
        <FileOutlined />,
        undefined
      );
    }
  });
}

export const buildTreeMenuData = (treeData: NodeFileNavigator) => {
  const menuData = buildMenuData(treeData.children);
  return getItem("Workspace", "sub4", <InboxOutlined />, menuData);
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const treeData = useSelector((state: RootState) => state.Tree);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const MenuAuthAccess = (): MenuItem[] => {
    const isAuthenticated = useSelector(
      (state: RootState) => state.auth.isAuthenticated
    );
    return !isAuthenticated
      ? [getItem("Authentifiation", "1", <LoginOutlined />)]
      : [
          getItem(<Link to={"/accueil"}>Accueil</Link>, "1", <HomeOutlined />),
          buildTreeMenuData(treeData),
          getItem(
            <Link to={"/authentification"} onClick={() => logOutUser()}>
              Deconnexion
            </Link>,
            "2",
            <LogoutOutlined />
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
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          theme="dark"
          mode="inline"
          items={MenuAuthAccess()}
        />
      </Sider>
      <Layout className="site-layout" style={{ background: "#131629" }}>
        <Content style={{ margin: "0 " }}>
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
