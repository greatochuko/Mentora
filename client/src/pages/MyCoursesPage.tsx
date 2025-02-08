import { redirect } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import { useUserContext } from "../context/userContext";
import MyCourseCard from "../components/MyCourseCard";

export default function MyCoursesPage() {
  const { user, loadingSession } = useUserContext();

  if (loadingSession) return <LoadingPage />;

  if (!user) redirect("/login");

  return (
    <main className="mx-auto flex w-[90%] max-w-7xl flex-1 flex-col gap-8 py-8 lg:flex-row">
      <h1 className="text-lg font-medium sm:text-xl">My Courses</h1>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-4">
        {user!.paidCourses.map((course) => (
          <MyCourseCard key={course._id} course={course} />
        ))}
      </div>
    </main>
  );
}
