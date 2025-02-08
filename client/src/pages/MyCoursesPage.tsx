import { Navigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import { useUserContext } from "../context/userContext";
import MyCourseCard from "../components/MyCourseCard";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";

export default function MyCoursesPage() {
  const { user, loadingSession, updateUser } = useUserContext();

  if (loadingSession) return <LoadingPage />;

  const { fetchData } = useFetch({
    url: "/auth/session",
    startLoading: true,
    initialData: [],
    onSuccess(result) {
      updateUser(result.data);
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  if (!user) return <Navigate to={"/login"} replace />;

  return (
    <main className="mx-auto flex w-[90%] max-w-7xl flex-1 flex-col gap-8 py-8">
      <h1 className="text-lg font-medium sm:text-xl">My Courses</h1>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-4">
        {user?.paidCourses &&
          user.paidCourses.map((course) => (
            <MyCourseCard key={course._id} course={course} />
          ))}
      </div>
    </main>
  );
}
