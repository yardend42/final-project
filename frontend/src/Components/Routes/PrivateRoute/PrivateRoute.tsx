import { cloneElement, FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthState } from "../../Redux/AuthReducer";
import { useSelector } from "react-redux";

interface PrivateRouteProps {
  requiredRole: string;
  element: ReactElement;
  path: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  element,
  requiredRole,
  path,
}) => {
  // Access the auth state from the Redux store
  const state = useSelector((state: { auth: AuthState }) => state.auth);
  const location = useLocation(); // Get the current URL

  // Check if the user is logged in
  if (!state.isLoggedIn) {
    console.log("User not logged in:", state.isLoggedIn);
    return <Navigate to="/Page404" state={{ from: location }} replace />;
  }

  // Check if the user has the required role
  if (state.role !== requiredRole) {
    console.log("Role does not match required role:", state.role, requiredRole);
    return <Navigate to="/" replace />;
  }
  // Render the provided element with the path as a prop if checks pass
  return cloneElement(element, { path });
};

export default PrivateRoute;
