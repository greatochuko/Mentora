import { Outlet, redirect } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { useUserContext } from "../context/userContext";
import LoadingPage from "./LoadingPage";

export default function DashboardLayout() {
  const { user, loadingSession } = useUserContext();

  if (loadingSession) return <LoadingPage className="min-h-screen" />;

  if (!user) redirect("/login");

  return (
    <main className="flex min-h-screen gap-4">
      <DashboardSidebar user={user!} />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </main>
  );
}
