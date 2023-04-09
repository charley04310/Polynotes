import React, { useCallback, useEffect, useState } from "react";
import {
  FileOutlined,
  FolderOutlined,
  InboxOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { MenuProps, Row } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logoutUser } from "../store/API/Authentification";
import { setIsAuthenticated } from "../store/slices/authSlice";
import logo from "../assets/img/PolyBunny.png";

import { NodeFileNavigator } from "../pages/home/utils/DataPayload";
import { Header } from "antd/es/layout/layout";

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
const headerStyle: React.CSSProperties = {
  textAlign: "left",
  position: "relative",
  zIndex: 1,
  height: 80,
  backgroundColor: "transparent",
};
export const buildTreeMenuData = (treeData: NodeFileNavigator) => {
  const menuData = buildMenuData(treeData.children);
  return getItem("Workspace", "sub4", <InboxOutlined />, menuData);
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const treeData = useSelector((state: RootState) => state.Tree);
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const MenuAuthAccess = (): MenuItem[] => {
    return !isAuthenticated
      ? []
      : [
          getItem(<Link to={"/home"}>Accueil</Link>, "1", <HomeOutlined />),
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

  // const [menuData, setMenuData] = useState<MenuItem[]>(MenuAuthAccess);

  // useEffect(() => {
  //   setMenuData(MenuAuthAccess);
  // }, [MenuAuthAccess, treeData]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logOutUser = async () => {
    const userLogout = await logoutUser();
    if (userLogout.message !== undefined) {
      dispatch(setIsAuthenticated(false));
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isAuthenticated ? (
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
      ) : (
        <Header style={headerStyle}>
          <Row>
            <img src={logo} alt="PolyBunny" style={{ width: "80px" }} />
          </Row>
        </Header>
      )}

      <Layout className="site-layout">
        <Content style={{ margin: "0 " }}>
          <div
            className="App"
            style={{
              padding: 24,
              minHeight: "80vh",
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <b>POLYNOTES</b> SCHOOL PROJECT - 2023 -
          <a href="https://github.com/charley04310/Polynotes"> @Charley</a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
