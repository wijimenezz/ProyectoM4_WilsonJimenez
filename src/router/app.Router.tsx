import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../components/login-register/loginPage/LoginPage";
import { RegisterPage } from "../components/login-register/RegisterPage/RegisterPAge";
import { DashboardPage } from "../components/dashboard/dashboardPage/DasboardPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dasboard",
    element: <DashboardPage />,
  },
]);
