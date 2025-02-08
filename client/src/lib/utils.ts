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
  const remainingSeconds = seconds % 60;
  const hoursDisplay = hours > 0 ? `${hours}h ` : "";
  const minutesDisplay = minutes > 0 ? `${minutes}m ` : "";
  const secondsDisplay =
    hours === 0 && remainingSeconds > 0 ? `${remainingSeconds.toFixed()}s` : "";
  return `${hoursDisplay}${minutesDisplay}${secondsDisplay}`.trim();
}

export async function uploadFile(
  image: string | File,
): Promise<{ url: string; error: null } | { url: null; error: string }> {
  try {
    if (typeof image === "string" && image.startsWith("https"))
      return { url: image, error: null };

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mentora");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    const { secure_url } = await res.json();

    if (!res.ok) throw new Error("An error occured uploading image");

    return { url: secure_url, error: null };
  } catch (error) {
    console.log((error as Error).message);
    return { url: null, error: (error as Error).message };
  }
}
