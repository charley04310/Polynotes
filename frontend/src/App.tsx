import React, { useEffect, useState } from "react";
import MainLayout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFoundPage from "./pages/NotFound";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

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

const items = () => {
  return [
    getItem("Home", "1", "/home", <PieChartOutlined />),
    getItem("About", "2", "/about", <DesktopOutlined />),
    getItem("User", "sub1", "/users", <UserOutlined />, [
      getItem("Tom", "3", "/users/tom"),
    ]),
    getItem("Team", "sub2", "/teams", <TeamOutlined />, [
      getItem("Team 1", "6", "/teams/team1"),
      getItem("Team 2", "8", "/teams/team2"),
    ]),
    getItem("Files", "9", "/files", <FileOutlined />),
  ];
};

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route element={<h1>Login</h1>} path="/login" />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
