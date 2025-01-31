import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AuthGuard from "./components/AuthGuard";

const router = createBrowserRouter([
  { index: true, element: <HomePage /> },
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
