import { LuSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import UserDropdown from "./UserDropdown";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCartContext } from "../context/cartContext";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const { user, loadingSession } = useUserContext();
  const { cartItems, cartLoading } = useCartContext();

  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/courses?query=${searchQuery}`);
  }

  return (
    <header className="bg-white py-3 text-sm shadow-xs">
      <nav className="mx-auto flex w-9/10 max-w-7xl items-center justify-between gap-4">
        <ul className="flex items-center gap-2">
          <li>
            <Link
              to={"/"}
              className="block rounded-md py-2 font-medium text-blue-600"
            >
              FobeworkLMS
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link
              to={"/courses"}
              className="block rounded-md px-3 py-1.5 text-zinc-500 duration-200 hover:text-blue-600"
            >
              All Courses
            </Link>
          </li>
        </ul>

        <form onSubmit={handleSearch} className="relative max-w-96 flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your courses here..."
            className="w-full rounded-full border border-zinc-300 px-4 py-2 pl-8"
          />
          <LuSearch className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 stroke-zinc-500" />
        </form>

        <div className="flex items-center gap-2">
          <Link
            to={"/cart"}
            className="group relative rounded-md border border-zinc-200 px-2 py-1.5 pl-1.5 duration-200 hover:bg-zinc-100"
          >
            <FiShoppingCart className="h-4 w-4 stroke-zinc-500 duration-200 group-hover:stroke-zinc-900" />
            <span
              className={`absolute top-0 right-0 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full text-sm font-semibold text-blue-500 ${cartLoading ? "bg-zinc-300" : "bg-white"}`}
            >
              {!cartLoading && cartItems.length}
            </span>
          </Link>
          {loadingSession ? (
            <div className="flex items-center gap-1">
              <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-100"></div>
              <div className="h-4 w-16 animate-pulse rounded-md bg-zinc-100"></div>
            </div>
          ) : user ? (
            <UserDropdown user={user} />
          ) : (
            <ul className="flex items-center gap-4">
              <li className="hidden sm:block">
                <Link
                  to={"/login"}
                  className="block rounded-md border border-blue-600 px-3 py-1.5 font-medium text-blue-600 duration-200 hover:bg-zinc-100"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to={"/register"}
                  className="block rounded-md bg-blue-600 px-3 py-1.5 font-medium text-white duration-200 hover:bg-blue-600/80"
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
