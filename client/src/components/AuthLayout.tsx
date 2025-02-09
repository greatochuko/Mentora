import authImage from "../assets/authImage.jpg";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="flex h-screen">
      <div className="flex h-full flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <div className="relative hidden flex-1 md:block">
        <img
          src={authImage}
          alt=""
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 flex h-1/2 w-full flex-col justify-end gap-2 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-8 pt-12 pb-8">
          <p className="text-center font-light text-zinc-300">
            LearnEx is a flexible Learning Management System offering thousands
            of courses in coding, design, business, and personal development.
            Taught by industry professionals, it provides on-demand video
            lessons for self-paced learning worldwide.
          </p>
          <p className="text-center text-white">John Doe - Digital Marketer</p>
        </div>
      </div>
    </main>
  );
}
