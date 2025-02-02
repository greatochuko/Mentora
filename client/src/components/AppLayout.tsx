import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <main className="min-h-screen flex-1">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
