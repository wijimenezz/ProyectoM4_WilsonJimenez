import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../components/login-register/loginPage/LoginPage";
import { RegisterPage } from "../components/login-register/RegisterPage/RegisterPAge";
import { DashboardPage } from "../components/dashboard/dashboardPage/DashboardPage";
import { ProtectedRoute } from "./ProtectedRoutes";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
]);
