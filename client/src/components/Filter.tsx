import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { categories } from "../lib/data";
import { useSearchParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function Filter({
  showFilter,
  closeFilter,
}: {
  showFilter: boolean;
  closeFilter(): void;
}) {
  const [rating, setRating] = useState<string>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  function toggleSelectedCategories(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  }

  function clearFilters() {
    setRating(undefined);
    setSelectedCategories([]);
    searchParams.delete("rating");
    searchParams.delete("categories");
    setSearchParams(searchParams);
  }

  function applyFilters() {
    rating ? searchParams.set("rating", rating) : searchParams.delete("rating");
    selectedCategories.length
      ? searchParams.set("categories", selectedCategories.toString())
      : searchParams.delete("categories");
    setSearchParams(searchParams);
  }

  return (
    <>
      <div
        onClick={closeFilter}
        className={`fixed top-0 left-0 z-10 h-full w-full bg-black/50 backdrop-blur-sm duration-300 lg:hidden ${showFilter ? "visible opacity-100" : "invisible opacity-0"}`}
      ></div>
      <div
        className={`fixed top-1/20 z-10 h-9/10 overflow-y-auto rounded-md border-zinc-300 bg-white whitespace-nowrap duration-300 ease-linear lg:static lg:h-fit lg:overflow-hidden ${showFilter ? "mr-4 w-9/10 border sm:w-fit lg:w-72" : "invisible w-9/10 opacity-0 sm:w-0 sm:opacity-100"}`}
      >
        <div className="sticky top-0 border-b border-zinc-300 bg-white p-2">
          <h3 className="text-center text-lg font-medium">Filter</h3>
          <button
            onClick={closeFilter}
            className="absolute top-1/2 right-2 -translate-y-1/2 p-2"
          >
            <IoClose />
          </button>
        </div>
        <div className="flex flex-col gap-2 border-b border-zinc-300 p-4">
          <h3 className="text-lg font-medium">Rating</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <label htmlFor="all" className="flex items-center gap-2">
                <input
                  type="radio"
                  name="rating"
                  id="all"
                  checked={!rating}
                  onChange={() => setRating(undefined)}
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
                    checked={selectedCategories.includes(category.slug)}
                    onChange={() => toggleSelectedCategories(category.slug)}
                    className="accent-blue-500"
                  />
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4 p-4">
          <button
            onClick={clearFilters}
            className="flex-1 rounded-md bg-rose-500 px-4 py-2 font-medium text-white duration-300 hover:bg-rose-600"
          >
            Clear Filters
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 rounded-md bg-blue-500 px-4 py-2 font-medium text-white duration-300 hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
