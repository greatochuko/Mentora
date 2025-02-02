import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { categories } from "../lib/data";

export default function Filter({ showFilter }: { showFilter: boolean }) {
  const [rating, setRating] = useState("all");

  return (
    <div
      className={`h-fit rounded-md border-zinc-300 duration-300 ease-linear ${showFilter ? "mr-4 w-72 border" : "w-0"}`}
    >
      <h3 className="border-b border-zinc-300 p-2 text-center text-lg font-medium">
        Filter
      </h3>
      <div className="flex flex-col gap-2 border-b border-zinc-300 p-4">
        <h3 className="text-lg font-medium">Rating</h3>
        <ul className="flex flex-col gap-2">
          <li>
            <label htmlFor="all" className="flex items-center gap-2">
              <input
                type="radio"
                name="rating"
                id="all"
                checked={rating === "all"}
                onChange={() => setRating("all")}
                className="accent-blue-500"
              />
              <FaStar className="h-4 w-4 fill-amber-500" />
              All Rating
            </label>
          </li>
          {["4.5", "4", "3.5", "3"].map((rat) => (
            <li key={rat}>
              <label htmlFor={rat} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="rating"
                  id={rat}
                  checked={rating === rat}
                  onChange={() => setRating(rat)}
                  className="accent-blue-500"
                />
                <FaStar className="h-4 w-4 fill-amber-500" />
                {rat} and up
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 border-b border-zinc-300 p-4">
        <h3 className="text-lg font-medium">Categories</h3>
        <ul className="flex flex-col gap-2">
          {categories.map((category, i) => (
            <li key={i}>
              <label
                htmlFor={category.slug}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name={category.slug}
                  id={category.slug}
                />
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
