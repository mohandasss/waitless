import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";

export const ProtectedRoutes = () => {
     console.log("ProtectedRoutes rendered");
    const isAuthenticated  =  true

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};