import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "../store/store";

const PublicRoutes = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
