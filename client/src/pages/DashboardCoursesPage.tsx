import { Link, useOutletContext } from "react-router-dom";
import { CourseType } from "../components/CourseCard";
import LoadingPage from "../components/LoadingPage";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useUserContext } from "../context/userContext";
import { formatTime } from "../lib/utils";

export default function DashboardCoursesPage() {
  const { expandSidebar } = useOutletContext<{ expandSidebar: boolean }>();

  const { user } = useUserContext();

  const { fetchData, data, loading } = useFetch({
    url: `/courses/user/${user?._id}`,
    startLoading: true,
    initialData: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const courses = data as CourseType[];

  if (loading) return <LoadingPage />;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium sm:text-xl">Courses</h1>
        <Link
          to={"/dashboard/courses/new"}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white duration-300 hover:bg-blue-600"
        >
          Create Course
        </Link>
      </div>

      <div
        className={`w-[calc(100vw-7rem)] overflow-x-scroll ${expandSidebar ? "md:w-[calc(100vw-15rem)]" : ""}`}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Course Name
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Duration
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                  <Link
                    to={`/dashboard/courses/edit/${course._id}`}
                    className="hover:underline"
                  >
                    {course.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                  {formatTime(
                    course.content.reduce(
                      (acc, curr) => acc + curr.video.duration,
                      0,
                    ),
                  )}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                  ${course.price / 100}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
