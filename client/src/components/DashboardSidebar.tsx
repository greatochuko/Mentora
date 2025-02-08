import { LuBookText, LuPackage } from "react-icons/lu";
import { TbDeviceAnalytics } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { UserType } from "../context/userContext";
import { GoSidebarCollapse } from "react-icons/go";
import { useState } from "react";

const sidebarLinks = [
  {
    text: "Dashboard",
    icon: TbDeviceAnalytics,
    href: "/dashboard",
  },
  {
    text: "Courses",
    icon: LuBookText,
    href: "/dashboard/courses",
  },
  {
    text: "Orders",
    icon: LuPackage,
    href: "/dashboard/orders",
  },
];

export default function DashboardSidebar({ user }: { user: UserType }) {
  const { pathname } = useLocation();

  const [expandSidebar, setExpandSidebar] = useState(false);

  return (
    <div
      className={`flex flex-col gap-8 overflow-hidden bg-[#0F172A] p-4 duration-300 ${expandSidebar ? "w-48" : "w-14"}`}
    >
      <div className="flex items-center justify-between">
        <Link
          to={"/"}
          className={`font-medium text-white duration-200 hover:text-blue-400 ${expandSidebar ? "" : "hidden"}`}
        >
          Mentora
        </Link>
        <button
          onClick={() => setExpandSidebar((curr) => !curr)}
          className="rounded-md p-1 hover:bg-white/10"
        >
          <GoSidebarCollapse
            className={`h-5 w-5 fill-white ${expandSidebar ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <ul className={`flex flex-col ${expandSidebar ? "gap-2" : "gap-6"}`}>
        {sidebarLinks.map((link) => (
          <li key={link.text}>
            <Link
              to={link.href}
              className={`group flex items-center gap-1 rounded-md duration-200 hover:bg-white/10 ${pathname.startsWith("/dashboard") ? "text-white" : "text-zinc-500"} ${expandSidebar ? "p-2" : "justify-center"}`}
            >
              <link.icon
                className={`h-5 w-5 duration-200 group-hover:stroke-white ${pathname.startsWith(link.href) ? "stroke-white" : "stroke-zinc-500"}`}
              />
              <span className={`text-white ${expandSidebar ? "" : "hidden"}`}>
                {link.text}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center gap-2">
        <img
          src={user.profilePicture}
          alt={`${user.firstName}'s profile picture`}
          className="aspect-square w-8 rounded-full"
        />
        <p className={`text-white ${expandSidebar ? "" : "hidden"}`}>
          Hi, {user.firstName}
        </p>
      </div>
    </div>
  );
}
