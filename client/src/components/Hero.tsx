import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import heroImage from "../assets/hero-image.webp";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="relative flex bg-zinc-100">
      <div className="z-10 flex flex-1 flex-col gap-4 bg-black/50 p-[7%] sm:bg-transparent sm:p-[5%]">
        <h3 className="text-2xl font-medium text-white sm:text-3xl sm:text-inherit md:text-4xl lg:text-5xl">
          Get world class courses from world class mentors
        </h3>
        <p className="text-sm text-zinc-200 sm:text-base sm:text-zinc-500">
          Learn valuable, practical skills for as low as #7,500. Sale ends
          tomorrow!
        </p>
        <form onSubmit={handleSearch} className="relative max-w-60 flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to learn"
            className="w-full rounded-full border-zinc-300 bg-black/80 px-4 py-2 pl-8 text-sm text-white sm:border sm:bg-white sm:text-base sm:text-inherit"
          />
          <LuSearch className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 stroke-zinc-500" />
        </form>
      </div>
      <div className="absolute top-0 left-0 h-full w-full flex-1 sm:relative sm:h-auto sm:w-auto">
        <img
          src={heroImage}
          alt="happy people learning"
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
