import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Header() {
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <header className="bg-white py-3 text-sm shadow-xs">
      <nav className="mx-auto flex w-[95%] max-w-7xl items-center justify-between gap-4 sm:w-9/10">
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
              className="block rounded-md px-4 py-2 text-zinc-500 duration-200 hover:text-blue-600"
            >
              All Courses
            </Link>
          </li>
        </ul>

        <form onSubmit={handleSearch} className="relative max-w-80 flex-1">
          <input
            type="text"
            placeholder="Search your courses here..."
            className="w-full rounded-full border border-zinc-300 px-4 py-2 pl-8"
          />
          <LuSearch className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 stroke-zinc-500" />
        </form>

        <ul className="flex items-center gap-2">
          <li className="hidden sm:block">
            <Link
              to={"/login"}
              className="block rounded-md px-4 py-2 text-zinc-500 duration-200 hover:text-blue-600"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to={"/login"}
              className="block rounded-md bg-blue-600 px-4 py-2 text-white duration-200 hover:bg-blue-600/80"
            >
              Signup
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
