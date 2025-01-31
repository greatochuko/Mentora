import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const isAuthenticated = false;

  if (isAuthenticated) return <Navigate to={"/"} replace />;

  return <Outlet />;
}
