import { RxCaretDown, RxCaretUp, RxDashboard } from "react-icons/rx";
import { UserType } from "../context/userContext";
import { useEffect, useRef, useState } from "react";
import { MdComputer, MdLogout } from "react-icons/md";
import ModalContainer from "./ModalContainer";
import LogoutModal from "./LogoutModal";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

export default function UserDropdown({ user }: { user: UserType }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function openSignOutModal() {
    setDropdownOpen(false);
    setModalOpen(true);
  }

  return (
    <>
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 duration-200 hover:bg-zinc-100"
        >
          <img
            src={user.profilePicture}
            alt={`${user.firstName}'s profile picture`}
            width={28}
            height={28}
            className="overflow-hidden rounded-full"
          />
          <div className="hidden items-center gap-1 sm:flex">
            <span>{user.firstName}</span>
            {dropdownOpen ? (
              <RxCaretUp className="h-5 w-5" />
            ) : (
              <RxCaretDown className="h-5 w-5" />
            )}
          </div>
        </button>
        <div
          className={`absolute top-[120%] right-0 z-20 flex w-40 flex-col rounded-md border border-zinc-100 bg-white p-2 shadow duration-100 ${dropdownOpen ? "visible opacity-100" : "invisible -translate-y-1 opacity-0"}`}
        >
          <Link
            onClick={() => setDropdownOpen(false)}
            to={"/profile"}
            className="flex items-center gap-1 rounded-md px-4 py-2 duration-200 hover:bg-zinc-100"
          >
            <FaRegUser /> My Profile
          </Link>
          <Link
            onClick={() => setDropdownOpen(false)}
            to={"/my-courses"}
            className="flex items-center gap-1 rounded-md px-4 py-2 duration-200 hover:bg-zinc-100"
          >
            <MdComputer /> My Courses
          </Link>
          <Link
            onClick={() => setDropdownOpen(false)}
            to={"/dashboard"}
            className="flex items-center gap-1 rounded-md px-4 py-2 duration-200 hover:bg-zinc-100"
          >
            <RxDashboard /> Dashboard
          </Link>
          <button
            onClick={openSignOutModal}
            className="flex items-center gap-1 rounded-md px-4 py-2 duration-200 hover:bg-zinc-100"
          >
            <MdLogout /> Sign out
          </button>
        </div>
      </div>

      <ModalContainer open={modalOpen} closeModal={() => setModalOpen(false)}>
        <LogoutModal closeModal={() => setModalOpen(false)} />
      </ModalContainer>
    </>
  );
}
