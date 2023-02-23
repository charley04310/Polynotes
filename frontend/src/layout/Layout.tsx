import React, { useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import logo from "./logo.png";

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
  getItem("Acceuil", "acceuil", "/acceuil", <PieChartOutlined />),
  //getItem("Récent", "recent", "/recent", <DesktopOutlined />),
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
            margin: 16,
          }}
        >
          <img src={logo} alt="OKOk" style={{ width: "100%" }} />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["acceuil"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
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
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
