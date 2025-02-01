import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AuthGuard from "./components/AuthGuard";
import RegisterPage from "./pages/RegisterPage";
import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
