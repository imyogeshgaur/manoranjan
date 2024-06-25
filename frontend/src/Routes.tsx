import { lazy } from "react";

const LoginPage = lazy(() => import("./Auth/Login"));
const RegisterPage = lazy(() => import("./Auth/Register"));
const ForgetPasswordPage = lazy(() => import("./Auth/ForgetPassword"));
const ResetPasswordPage = lazy(() => import("./Auth/ResetPassword"));
const HomePage = lazy(() => import("./Home/AllVideo"));
const AddVideoPage = lazy(() => import("./Home/AddVideo"));
const EditVideoPage = lazy(() => import("./Home/EditVideo"));
const ViewUsersPage = lazy(() => import("./admin/ViewUsers"));

const routes = [
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgetPassword", element: <ForgetPasswordPage /> },
  { path: "/resetPassword/:userId", element: <ResetPasswordPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/addVideo", element: <AddVideoPage /> },
  { path: "/edit/:videoId", element: <EditVideoPage /> },
  { path: "/viewUsers", element: <ViewUsersPage /> },
];

export default routes;
