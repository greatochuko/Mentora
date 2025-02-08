import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import LoadingPage from "../components/LoadingPage";
import { redirect } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";

export default function UserProfilePage() {
  const { user, loadingSession, updateUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || "",
  );

  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setProfilePicture(user?.profilePicture || "");
  }, [user?.firstName, user?.lastName, user?.profilePicture]);

  if (loadingSession) return <LoadingPage />;

  async function handleUpdateInformation(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${BASE_URL}/api/v1/user`, {
        method: "PATCH",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ firstName, lastName }),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message);

      updateUser(data.data);
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
    }
    setLoading(false);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  if (!user) redirect("/login");

  return (
    <main className="mx-auto w-[90%] max-w-7xl flex-1 py-8">
      <form
        onSubmit={handleUpdateInformation}
        className="flex flex-col gap-4 rounded-lg border border-zinc-300 p-4 text-sm"
      >
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 p-2"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <h2>Image Preview</h2>
          <div className="flex flex-wrap gap-4">
            <img
              src={profilePicture}
              alt={`${firstName}'s profile picture`}
              className="aspect-square w-full max-w-40 rounded-lg"
            />
            <label
              role="button"
              htmlFor="profile-picture"
              className="max-w-40 cursor-pointer self-end rounded-md border border-zinc-300 px-4 py-2 text-center font-medium duration-200 hover:bg-zinc-100"
            >
              Change Image
            </label>
          </div>
          <input
            type="file"
            name="profile-picture"
            id="profile-picture"
            onChange={handleImageChange}
            hidden
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex h-10 items-center justify-center rounded-lg bg-blue-500 px-4 py-2 font-medium text-white duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-500/50"
        >
          {loading ? <LoadingIndicator /> : "Update Information"}
        </button>
      </form>
    </main>
  );
}
