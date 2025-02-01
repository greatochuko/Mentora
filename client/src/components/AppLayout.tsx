import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
  return (
    <main className="min-h-screen flex-1">
      <Header />
      <Outlet />
    </main>
  );
}
