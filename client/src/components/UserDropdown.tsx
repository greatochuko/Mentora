import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { UserType } from "../context/userContext";
import { useEffect, useRef, useState } from "react";
import { MdLogout } from "react-icons/md";
import ModalContainer from "./ModalContainer";
import LogoutModal from "./LogoutModal";

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
          <span>{user.firstName}</span>
          {dropdownOpen ? (
            <RxCaretUp className="h-5 w-5" />
          ) : (
            <RxCaretDown className="h-5 w-5" />
          )}
        </button>
        <div
          className={`absolute top-[120%] right-0 flex w-32 flex-col rounded-md border border-zinc-100 bg-white p-2 shadow duration-100 ${dropdownOpen ? "visible opacity-100" : "invisible -translate-y-1 opacity-0"}`}
        >
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
