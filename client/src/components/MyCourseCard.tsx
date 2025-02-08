import { FaStar } from "react-icons/fa";
import { CourseType } from "./CourseCard";
import { Link } from "react-router-dom";

export default function MyCourseCard({ course }: { course: CourseType }) {
  const courseRating =
    course.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
    course.reviews.length;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-300 p-2">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="aspect-video w-full rounded-sm object-cover"
      />
      <Link
        to={`/my-courses/${course._id}`}
        className="font-medium hover:underline"
      >
        {course.title}
      </Link>
      <p className="text-sm text-zinc-500">
        By {course.user.firstName} {course.user.lastName}
      </p>
      <p className="flex items-center gap-1 text-sm text-amber-500">
        {courseRating ? courseRating.toFixed(1) : 0}{" "}
        <FaStar className="h-4 w-4 fill-amber-500" />
        <span className="text-zinc-500">
          ({course.reviews.length || "No reviews yet"})
        </span>
      </p>
    </div>
  );
}
