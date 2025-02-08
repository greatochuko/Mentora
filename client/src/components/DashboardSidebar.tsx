import { LuBookText, LuPackage } from "react-icons/lu";
import { TbDeviceAnalytics } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { UserType } from "../context/userContext";
import { GoSidebarCollapse } from "react-icons/go";
import React from "react";

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

export default function DashboardSidebar({
  user,
  expandSidebar,
  setExpandSidebar,
}: {
  user: UserType;
  expandSidebar: boolean;
  setExpandSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { pathname } = useLocation();

  return (
    <div
      className={`sticky top-0 flex h-screen shrink-0 flex-col gap-8 overflow-hidden bg-[#0F172A] p-4 duration-300 ${expandSidebar ? "w-14 md:w-48" : "w-14"}`}
    >
      <div className="flex items-center justify-between">
        <Link
          to={"/"}
          className={`font-medium text-white duration-200 hover:text-blue-400 ${expandSidebar ? "hidden md:inline" : "hidden"}`}
        >
          Mentora
        </Link>
        <button
          onClick={() => setExpandSidebar((curr) => !curr)}
          className="rounded-md p-1 hover:bg-white/10"
        >
          <GoSidebarCollapse
            className={`h-5 w-5 fill-white ${expandSidebar ? "md:rotate-180" : ""}`}
          />
        </button>
      </div>
      <ul
        className={`flex flex-col ${expandSidebar ? "gap-6 md:gap-2" : "gap-6"}`}
      >
        <li key={sidebarLinks[0].text}>
          <Link
            to={sidebarLinks[0].href}
            className={`group flex items-center gap-1 rounded-md duration-200 hover:bg-white/10 ${pathname === sidebarLinks[0].href ? "text-white" : "text-zinc-500"} ${expandSidebar ? "justify-center md:justify-start md:p-2" : "justify-center"}`}
          >
            <TbDeviceAnalytics
              className={`h-5 w-5 duration-200 group-hover:stroke-white ${pathname === sidebarLinks[0].href ? "stroke-white" : "stroke-zinc-500"}`}
            />
            <span
              className={`text-white ${expandSidebar ? "hidden md:inline" : "hidden"}`}
            >
              {sidebarLinks[0].text}
            </span>
          </Link>
        </li>
        {sidebarLinks.slice(1).map((link) => (
          <li key={link.text}>
            <Link
              to={link.href}
              className={`group flex items-center gap-1 rounded-md duration-200 hover:bg-white/10 ${pathname.startsWith(link.href) ? "text-white" : "text-zinc-500"} ${expandSidebar ? "justify-center md:justify-start md:p-2" : "justify-center"}`}
            >
              <link.icon
                className={`h-5 w-5 duration-200 group-hover:stroke-white ${pathname.startsWith(link.href) ? "stroke-white" : "stroke-zinc-500"}`}
              />
              <span
                className={`text-white ${expandSidebar ? "hidden md:inline" : "hidden"}`}
              >
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
        <p
          className={`text-white ${expandSidebar ? "hidden md:block" : "hidden"}`}
        >
          Hi, {user.firstName}
        </p>
      </div>
    </div>
  );
}
