import { useEffect, useRef, useState } from "react";
import CourseCard, { CourseType } from "./CourseCard";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import CourseCardWireframe from "./CourseCardWireframe";

export default function PopularCoursesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const courseGalleryRef = useRef<HTMLDivElement>(null);

  const { fetchData, loading, data } = useFetch({
    url: "/courses/popular",
    startLoading: true,
    initialData: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    courseGalleryRef.current?.scroll({ left: 0 });
  }, [selectedCategory]);

  const popularCourses = data as CourseType[];

  const popularCategories = Array.from(
    new Set(popularCourses.map((course) => course.category)),
  );

  function handleScrollRight() {
    courseGalleryRef.current?.scrollBy({
      left: 240,
      behavior: "smooth",
    });
  }

  function handleScrollLeft() {
    if (!courseGalleryRef.current) return;

    courseGalleryRef.current.scrollBy({
      left: -240,
      behavior: "smooth",
    });
  }

  const filteredCourses =
    selectedCategory === "All"
      ? popularCourses
      : popularCourses.filter((course) => course.category === selectedCategory);

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl font-medium sm:text-2xl md:text-3xl">
        Our Popular Courses
      </h2>
      <ul className="no-scrollbar flex max-w-full gap-4 overflow-x-auto">
        <li
          onClick={() => setSelectedCategory("All")}
          role="button"
          className={`cursor-pointer rounded-full border p-1 px-3 text-sm font-medium whitespace-nowrap duration-200 ${selectedCategory === "All" ? "border-zinc-300 bg-blue-600 text-white hover:bg-blue-500" : "border-zinc-200 text-zinc-500 hover:bg-zinc-100"}`}
        >
          {"All"}
        </li>
        {popularCategories.map((cat) => (
          <li
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            role="button"
            className={`cursor-pointer rounded-full border p-1 px-3 text-sm font-medium whitespace-nowrap duration-200 ${selectedCategory === cat ? "border-zinc-300 bg-blue-600 text-white hover:bg-blue-500" : "border-zinc-200 text-zinc-500 hover:bg-zinc-100"}`}
          >
            {cat}
          </li>
        ))}
      </ul>

      <div className="relative w-full">
        <div
          ref={courseGalleryRef}
          className="no-scrollbar flex w-full snap-x snap-mandatory grid-flow-col gap-4 overflow-x-auto"
        >
          {loading
            ? Array(6)
                .fill("")
                .map((_, index) => (
                  <CourseCardWireframe
                    key={index}
                    className="min-w-60 flex-1 snap-start sm:min-w-64"
                  />
                ))
            : filteredCourses.map((course) => (
                <CourseCard
                  course={course}
                  key={course._id}
                  className="min-w-60 flex-1 snap-start sm:min-w-64"
                />
              ))}
        </div>
        <button
          onClick={handleScrollLeft}
          className="absolute top-1/2 left-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-200 bg-white p-2 shadow-md duration-200 hover:bg-zinc-100"
        >
          <PiCaretLeftBold className="h-6 w-6" />
        </button>
        <button
          onClick={handleScrollRight}
          className="absolute top-1/2 right-0 z-20 -translate-y-1/2 translate-x-1/2 rounded-full border border-zinc-200 bg-white p-2 shadow-md duration-200 hover:bg-zinc-100"
        >
          <PiCaretRightBold className="h-6 w-6" />
        </button>
      </div>
      <Link
        to={
          selectedCategory === "All"
            ? "/courses"
            : `/courses?cat=${encodeURIComponent(selectedCategory)}`
        }
        className="rounded-md border border-blue-600 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-blue-600 duration-300 hover:bg-blue-600 hover:text-white"
      >
        See All
      </Link>
    </div>
  );
}
