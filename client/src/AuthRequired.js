import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const AuthRequired = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.roles?.some((role) =>
    allowedRoles?.includes(role !== null ? role.toString() : role)
  ) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default AuthRequired;
