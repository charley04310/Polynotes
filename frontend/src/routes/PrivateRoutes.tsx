import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "../store/store";

const PrivateRoutes = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? <Outlet /> : <Navigate to="/authentification" />;
};

export default PrivateRoutes;
