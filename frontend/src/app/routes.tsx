import { createBrowserRouter } from "react-router";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { MainLayout } from "./layouts/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { CustomerList } from "./pages/CustomerList";
import { CustomerDetail } from "./pages/CustomerDetail";
import { Prediction } from "./pages/Prediction";
import { Analytics } from "./pages/Analytics";
import { Admin } from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "customers", Component: CustomerList },
      { path: "customers/:id", Component: CustomerDetail },
      { path: "prediction", Component: Prediction },
      { path: "analytics", Component: Analytics },
      { path: "admin", Component: Admin },
    ],
  },
]);
