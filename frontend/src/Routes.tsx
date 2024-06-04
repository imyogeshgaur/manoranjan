import { lazy } from "react";

const LoginPage = lazy(() => import("./Auth/Login"));
const RegisterPage = lazy(() => import("./Auth/Register"));
const ForgetPasswordPage = lazy(() => import("./Auth/ForgetPassword"));
const ResetPasswordPage = lazy(() => import("./Auth/ResetPassword"));
const HomePage = lazy(() => import("./Home/AllVideo"));

const routes = [
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgetPassword", element: <ForgetPasswordPage /> },
  { path: "/resetPassword/:userId", element: <ResetPasswordPage /> },
  { path: "/home", element: <HomePage /> },
];

export default routes;