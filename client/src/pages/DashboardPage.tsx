import { MdComputer } from "react-icons/md";
import useFetch from "../hooks/useFetch";
import { useUserContext } from "../context/userContext";
import { useEffect } from "react";
import { CourseType } from "../components/CourseCard";
import { Link } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import { formatTime } from "../lib/utils";

export default function DashboardPage() {
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium sm:text-xl">Dashboard</h1>
        <Link
          to={"/dashboard/courses/new"}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white duration-300 hover:bg-blue-600"
        >
          Create Course
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <MdComputer className="h-14 w-14 fill-blue-400" />
          <div className="flex-1">
            <h3 className="text-xl font-medium">23</h3>
            <p className="text-sm text-zinc-500">Courses sold</p>
          </div>
        </div>
        <div className="flex gap-4 rounded-lg border border-green-200 bg-green-50 p-4">
          <MdComputer className="h-14 w-14 fill-green-400" />
          <div className="flex-1">
            <h3 className="text-xl font-medium">$5000</h3>
            <p className="text-sm text-zinc-500">Total revenue</p>
          </div>
        </div>
        <div className="flex gap-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
          <MdComputer className="h-14 w-14 fill-purple-400" />
          <div className="flex-1">
            <h3 className="text-xl font-medium">50</h3>
            <p className="text-sm text-zinc-500">Total students</p>
          </div>
        </div>
        <div className="flex gap-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
          <MdComputer className="h-14 w-14 fill-orange-400" />
          <div className="flex-1">
            <h3 className="text-xl font-medium">10</h3>
            <p className="text-sm text-zinc-500">Total courses</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium sm:text-lg">Courses</h1>
          <Link
            to={"/dashboard/courses"}
            className="text-sm text-blue-500 hover:underline"
          >
            View All
          </Link>
        </div>

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
            {courses.slice(0, 5).map((course) => (
              <tr key={course._id}>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                  <Link
                    to={`/dashboard/courses/${course._id}`}
                    className="hover:underline"
                  >
                    {course.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                  {formatTime(
                    course.content.reduce(
                      (acc, curr) => acc + curr.duration,
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
