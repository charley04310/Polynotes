import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

type MainLayoutProps = {
  children: React.ReactNode;
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  to: string, // new 'to' prop added for the link
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: (
      <Link to={to}>
        {" "}
        {/* wrap label in Link component */}
        {label}
      </Link>
    ),
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Home", "1", "/home", <PieChartOutlined />),
  getItem("About", "2", "/about", <DesktopOutlined />),
  getItem("User", "sub1", "/users", <UserOutlined />, [
    getItem("Tom", "3", "/users/tom"),
    getItem("Bill", "4", "/users/bill"),
    getItem("Alex", "5", "/users/alex"),
  ]),
  getItem("Team", "sub2", "/teams", <TeamOutlined />, [
    getItem("Team 1", "6", "/teams/team1"),
    getItem("Team 2", "8", "/teams/team2"),
  ]),
  getItem("Files", "9", "/files", <FileOutlined />),
];

const MainLayout = ({ children }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />

        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
