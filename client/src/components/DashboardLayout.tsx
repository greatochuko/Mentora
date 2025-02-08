import { Navigate, Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { useUserContext } from "../context/userContext";
import LoadingPage from "./LoadingPage";
import { useState } from "react";

export default function DashboardLayout() {
  const { user, loadingSession } = useUserContext();

  const [expandSidebar, setExpandSidebar] = useState(true);

  if (loadingSession) return <LoadingPage className="min-h-screen" />;

  if (!user) return <Navigate to={"/login"} replace />;

  return (
    <main className="flex min-h-screen">
      <DashboardSidebar
        user={user!}
        expandSidebar={expandSidebar}
        setExpandSidebar={setExpandSidebar}
      />
      <div className="flex-1 p-4">
        <Outlet context={{ expandSidebar }} />
      </div>
    </main>
  );
}
