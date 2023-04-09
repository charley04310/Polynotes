import { Navigate, Outlet } from "react-router";

interface Props {
  isAuthenticated: boolean;
}
const PublicRoutes: React.FC<Props> = ({ isAuthenticated }) => {
  return !isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};

export default PublicRoutes;
