import { useUserContext } from "../context/userContext";
import useFetch from "../hooks/useFetch";
import LoadingIndicator from "./LoadingIndicator";

export default function LogoutModal({ closeModal }: { closeModal(): void }) {
  const { updateUser } = useUserContext();

  const { fetchData, loading } = useFetch({
    url: "/auth/logout",
    method: "POST",
    onComplete() {
      updateUser(null);
    },
  });

  async function handleSignout() {
    await fetchData();
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-1/2 left-1/2 flex w-9/10 max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col rounded-md border border-zinc-300 bg-white"
    >
      <div className="flex flex-1 flex-col items-center gap-4 border-b border-zinc-200 p-8">
        <h3 className="text-lg font-medium">Sign out?</h3>
        <p className="text-center text-zinc-500">
          Are you sure you want to sign out?
        </p>
      </div>
      <div className="flex items-center justify-end gap-4 px-4 py-3">
        <button
          onClick={closeModal}
          className="rounded-md border border-zinc-300 px-4 py-2 duration-200 hover:bg-[#f8f8f8]"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={handleSignout}
          className="rounded-md bg-rose-500 px-4 py-2 font-medium text-white duration-200 hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-rose-500/50"
        >
          {loading ? <LoadingIndicator /> : "Sign out"}
        </button>
      </div>
    </div>
  );
}
