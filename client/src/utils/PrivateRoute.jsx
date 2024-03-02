// PrivateRoute.js
import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { routes } from "./routeUtils";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const allowedRoles = routes[location.pathname];
  if (!allowedRoles || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // Redirect to home if not authorized
  }

  return <Outlet />;
};

export default PrivateRoute;
