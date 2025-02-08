import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import LoadingPage from "./LoadingPage";

export default function AuthGuard() {
  const { user, loadingSession } = useUserContext();

  if (loadingSession) return <LoadingPage />;

  if (user) return <Navigate to={"/"} replace />;

  return <Outlet />;
}
