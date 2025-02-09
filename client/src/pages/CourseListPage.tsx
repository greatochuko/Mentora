import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import CourseCard, { CourseType } from "../components/CourseCard";
import CourseCardWireframe from "../components/CourseCardWireframe";
import Filter from "../components/Filter";
import Paginator from "../components/Paginator";
import { MdFilterList, MdFilterListOff } from "react-icons/md";

export default function CourseListPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState<string>();

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");
  const page = searchParams.get("page");

  useEffect(() => {
    document.title = `Courses - ${query ? `Search results for "${query}" - ` : ""}Page ${page || 1}`;
  }, [page, query]);

  const { fetchData, loading, data, resData } = useFetch({
    url: `/courses/search?query=${query}&page=${page}&sort=${sortBy}`,
    startLoading: true,
    initialData: [],
  });

  useEffect(() => {
    fetchData();
  }, [query, page, sortBy]);

  function gotoPage(page: number) {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  }

  const totalPages = resData?.totalPages || 1;
  const totalResults = resData?.totalCourses || 0;
  const courses = data as CourseType[];

  return (
    <main className="mx-auto flex w-9/10 max-w-7xl flex-1 py-8">
      <Filter
        showFilter={showFilter}
        closeFilter={() => setShowFilter(false)}
      />
      <div className="flex min-w-60 flex-1 flex-col gap-4">
        <div className="flex flex-wrap justify-between gap-4">
          <h1 className="w-full text-lg font-medium sm:w-fit">
            We found <span className="text-blue-600">{totalResults}</span>{" "}
            courses for you
          </h1>
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm duration-300 hover:bg-zinc-100 sm:order-3"
          >
            {showFilter ? (
              <MdFilterListOff className="h-4 w-4" />
            ) : (
              <MdFilterList className="h-4 w-4" />
            )}
          </button>
          <select
            name="sort"
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm duration-200 sm:ml-auto"
          >
            <option value={"default"}>Sort By</option>
            <option value={"newest"} className="hover:bg-blue-500">
              Newest first
            </option>
            <option value={"oldest"} className="hover:bg-blue-500">
              Oldest first
            </option>
          </select>
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
    </main>
  );
}
