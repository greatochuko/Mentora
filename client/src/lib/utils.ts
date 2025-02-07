import { CourseType } from "../components/CourseCard";

export function getCourseRating(course: CourseType) {
  return (
    course.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
    course.reviews.length
  );
}
