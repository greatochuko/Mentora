import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import CourseCard, { CourseType } from "../components/CourseCard";
import CourseCardWireframe from "../components/CourseCardWireframe";
import Filter from "../components/Filter";
import Paginator from "../components/Paginator";

export default function CourseListPage() {
  const [showFilter, setShowFilter] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");
  const page = searchParams.get("page");

  const { fetchData, loading, data, resData } = useFetch({
    url: `/courses/search?query=${query}&page=${page}`,
    startLoading: true,
    initialData: [],
  });

  useEffect(() => {
    fetchData();
  }, [query, page]);

  function gotoPage(page: number) {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  }

  const totalPages = resData?.totalPages || 1;
  const totalResults = resData?.totalCourses || 0;
  const courses = data as CourseType[];

  return (
    <div className="mx-auto flex w-9/10 max-w-7xl py-8">
      <Filter showFilter={showFilter} />
      <div className="flex min-w-60 flex-1 flex-col gap-4">
        <div className="flex justify-between gap-4">
          <h1 className="text-lg font-medium">
            We found <span className="text-blue-600">{totalResults}</span>{" "}
            courses for you
          </h1>
          <select
            name="sort"
            id="sort"
            className="ml-auto rounded-md border border-zinc-300 px-3 py-1.5 text-sm duration-200 hover:bg-zinc-100"
          >
            <option hidden>Sort By</option>
            <option value={"newest"}>Newest first</option>
            <option value={"oldest"}>Oldest first</option>
          </select>
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100"
          >
            {showFilter ? "Hide" : "Show"} Filter
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))]">
          {loading
            ? Array(8)
                .fill("")
                .map((_, i) => <CourseCardWireframe key={i} />)
            : courses.map((course) => (
                <CourseCard course={course} key={course._id} />
              ))}
        </div>
        <Paginator
          gotoPage={gotoPage}
          page={Number(page)}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
