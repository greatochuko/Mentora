import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import NotFoundPage from "./NotFoundPage";
import { CourseType } from "../components/CourseCard";
import { formatTime } from "../lib/utils";
import { IoVideocamOutline } from "react-icons/io5";
import { useUserContext } from "../context/userContext";

export default function CourseWatchPage() {
  const { courseId } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState("Details");

  const { user, loadingSession } = useUserContext();

  const { fetchData, data, loading } = useFetch({
    url: `/courses/learning/${courseId}`,
    startLoading: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || loadingSession) return <LoadingPage />;

  const course = data as CourseType;

  if (!course || !user?.paidCourses.some((c) => c._id === course._id))
    return <NotFoundPage />;

  const selectedContent = course.content[selectedIndex];

  return (
    <main className="mx-auto flex w-[90%] max-w-7xl flex-1 gap-8 py-8">
      <div className="flex flex-[2] flex-col gap-4">
        <video
          src={selectedContent.videoUrl}
          className="rounded-lg"
          controls
        ></video>
        <ul className="flex items-center gap-2 border-b border-zinc-300">
          <li
            role="button"
            onClick={() => setCurrentTab("Details")}
            className={`cursor-pointer rounded-md p-2 duration-200 hover:bg-zinc-100 ${currentTab === "Details" ? "font-medium" : "text-zinc-500"}`}
          >
            Details
          </li>
          <li
            role="button"
            onClick={() => setCurrentTab("Content")}
            className={`cursor-pointer rounded-md p-2 duration-200 hover:bg-zinc-100 lg:hidden ${currentTab === "Content" ? "font-medium" : "text-zinc-500"}`}
          >
            Content
          </li>
        </ul>
        <div className={currentTab === "Content" ? "" : "hidden"}></div>
        <CourseCompletion
          className={`lg:hidden ${currentTab === "Content" ? "" : "hidden"}`}
          course={course}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div
          className={`flex flex-col gap-4 ${currentTab === "Details" ? "" : "hidden"}`}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Section Title</h3>
            <p className="text-sm text-zinc-500">{selectedContent.title}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Section Overview</h3>
            <p className="text-sm text-zinc-500">
              {selectedContent.description}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Instructor</h3>
            <div className="flex items-center gap-2">
              <img
                src={course.user.profilePicture}
                alt={`${course.user.firstName}'s profile picture`}
                className="h-10 w-10 rounded-full"
              />
              <p className="font-medium">
                {course.user.firstName} {course.user.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>
      <CourseCompletion
        className="sticky top-4 hidden lg:flex"
        course={course}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </main>
  );
}

function CourseCompletion({
  course,
  selectedIndex,
  setSelectedIndex,
  className,
}: {
  className: string;
  course: CourseType;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div
      className={`h-fit flex-1 flex-col gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4 ${className}`}
    >
      <h2 className="text-lg font-medium">Course Completion</h2>
      <ul className="flex flex-col gap-4">
        {course.content.map((content, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name={`completed-${index}`}
              id={`completed-${index}`}
              className="accent-blue-500"
            />
            <p
              role="button"
              className={`cursor-pointer hover:underline ${index === selectedIndex ? "text-blue-500" : ""}`}
              onClick={() => setSelectedIndex(index)}
            >
              {index + 1}. {content.title}
            </p>
            <span className="ml-auto flex items-center gap-1 text-zinc-500">
              <IoVideocamOutline className="h-4 w-4 stroke-zinc-500" />
              {formatTime(content.duration)}
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
}
