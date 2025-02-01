import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import LoadingIndicator from "./LoadingIndicator";

export default function AuthGuard() {
  const { user, loadingSession } = useUserContext();

  if (loadingSession)
    return (
      <div className="flex h-screen flex-1 items-center justify-center">
        <LoadingIndicator color="#155dfc" size={28} />
      </div>
    );

  if (user) return <Navigate to={"/"} replace />;

  return <Outlet />;
}
