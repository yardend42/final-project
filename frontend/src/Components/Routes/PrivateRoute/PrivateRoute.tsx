import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthState } from "../../Redux/AuthReducer";
import { useSelector } from "react-redux";

interface PrivateRouteProps {
  requiredRole: string;
  element: React.ReactElement;
  path: string; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  requiredRole,
  path,
}) => {

  const state = useSelector((state: { auth: AuthState }) => state.auth);
  const location = useLocation();

  if (!state.isLoggedIn) {
    console.log("User not logged in:", state.isLoggedIn);
    return <Navigate to="/Page404" state={{ from: location }} replace />;
  }

  if (state.role !== requiredRole) {
    console.log("Role does not match required role:", state.role, requiredRole);
    return <Navigate to="/" replace />;
  }

  return React.cloneElement(element, { path });
};

export default PrivateRoute;
