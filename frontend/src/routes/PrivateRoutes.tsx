import { Navigate, Outlet } from "react-router";
interface Props {
  isAuthenticated: boolean;
}

const PrivateRoutes: React.FC<Props> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/getting-started" />;
};

export default PrivateRoutes;
