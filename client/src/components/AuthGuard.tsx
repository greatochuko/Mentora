import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import LoadingScreen from "./LoadingScreen";

export default function AuthGuard() {
  const { user, loadingSession } = useUserContext();

  if (loadingSession) return <LoadingScreen />;

  if (user) return <Navigate to={"/"} replace />;

  return <Outlet />;
}
