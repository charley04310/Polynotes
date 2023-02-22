import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
  let isAuthenticated = true;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
