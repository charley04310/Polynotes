import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "../store/store";

interface Props {
  isAuthenticated: boolean;
}
const PublicRoutes: React.FC<Props> = ({ isAuthenticated }) => {
  return !isAuthenticated ? <Outlet /> : <Navigate to="/accueil" />;
};

export default PublicRoutes;
