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

// export async function uploadVideos(
//   videos: { fileName: string; duration: number; url: string }[],
// ): Promise<
//   | {
//       uploadedVideos: { fileName: string; duration: number; url: string }[];
//       error: null;
//     }
//   | { uploadedVideos: null; error: string }
// > {
//   try {
//     const uploadedVideos = await Promise.all(
//       videos.map(async (video) => {
//         if (video.url.startsWith("https")) return video;
//         const formData = new FormData();
//         formData.append("file", video.url);
//         formData.append("upload_preset", "mentora");
//         const res = await fetch(
//           `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`,
//           {
//             method: "POST",
//             body: formData,
//           },
//         );
//         const { url, error } = await res.json();
//         if (error) throw new Error(error);

//         return { ...video, url };
//       }),
//     );
//     return { uploadedVideos, error: null };
//   } catch (error) {
//     return { uploadedVideos: null, error: (error as Error).message };
//   }
// }

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
    const { secure_url, error } = await res.json();
    console.log(error);

    if (!res.ok) throw new Error("An error occured uploading image");

    return { url: secure_url, error: null };
  } catch (error) {
    console.log((error as Error).message);
    return { url: null, error: (error as Error).message };
  }
}
