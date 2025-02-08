import { CourseType } from "../components/CourseCard";

export function getCourseRating(course: CourseType) {
  return (
    course.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
    course.reviews.length
  );
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const hoursDisplay = hours > 0 ? `${hours}h ` : "";
  const minutesDisplay = minutes > 0 ? `${minutes}m` : "";
  return `${hoursDisplay}${minutesDisplay}`.trim();
}
