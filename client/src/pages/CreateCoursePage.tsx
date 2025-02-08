import { useEffect, useState } from "react";
import { CourseContentType, CourseType } from "../components/CourseCard";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

export default function CreateCoursePage() {
  const { courseId } = useParams();

  const { fetchData, data, loading } = useFetch({
    url: `/courses/learning/${courseId}`,
    startLoading: !!courseId,
  });

  const course = data as CourseType | null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chapters, setChapters] = useState<CourseContentType[]>([
    {
      title: "",
      description: "",
      video: { fileName: "", url: "", duration: 0 },
    },
  ]);

  useEffect(() => {
    if (!courseId) return;
    fetchData();
  }, []);

  useEffect(() => {
    if (!course) return;
    setTitle(course.title);
    setDescription(course.description);
    setChapters(course.content);
  }, [course]);

  if (loading) return <LoadingPage />;

  function handleUpdateChapter<T extends keyof CourseContentType>(
    index: number,
    field: T,
    value: CourseContentType[T],
  ) {
    setChapters((curr) =>
      curr.map((chapter, i) =>
        i === index ? { ...chapter, [field]: value } : chapter,
      ),
    );
  }

  function handleAddChapter() {
    setChapters((curr) => [
      ...curr,
      {
        title: "",
        description: "",
        video: { fileName: "", url: "", duration: 0 },
      },
    ]);
  }

  function deleteChapter(index: number) {
    setChapters((curr) => curr.filter((_, i) => i !== index));
  }

  function handleUpdateChapterVideo(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      const videoElement = document.createElement("video");

      videoElement.src = videoUrl;
      videoElement.preload = "metadata";

      videoElement.onloadedmetadata = () => {
        const duration = videoElement.duration;
        const video = { fileName: file.name, url: videoUrl, duration };
        handleUpdateChapter(index, "video", video);
      };
    }
  }

  const cannotSubmit =
    !title.trim() ||
    !description.trim() ||
    chapters.some(
      (chapter) =>
        !chapter.title.trim() ||
        !chapter.description.trim() ||
        !chapter.video.url,
    );

  function handleCreateCourse(event: React.FormEvent) {
    event.preventDefault();
    if (cannotSubmit) return;

    // Add logic to handle course creation
  }

  function handleEditCourse() {}
  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium sm:text-xl">
          {courseId ? "Edit" : "Create New"} Course
        </h1>
        {courseId && (
          <button className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white ring-rose-300 ring-offset-2 duration-300 hover:bg-rose-600 focus-visible:ring-2">
            Delete
          </button>
        )}
      </div>
      <form
        onSubmit={courseId ? handleEditCourse : handleCreateCourse}
        className="flex flex-col gap-8 text-sm"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-medium">Course Details</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Course Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title for this course"
              className="w-full rounded-md border border-zinc-300 p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Course Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Write a little about this course"
              className="w-full rounded-md border border-zinc-300 p-2"
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-base font-medium">Chapter Details</h2>
          {chapters.map((chapter, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base">Chapter #{index + 1}</h3>
                {index > 0 && (
                  <button
                    onClick={() => deleteChapter(index)}
                    className="rounded-md bg-rose-500 px-3 py-1.5 font-medium text-white ring-rose-300 ring-offset-2 duration-300 hover:bg-rose-600 focus-visible:ring-2"
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`chapter-title-${index}`}>Chapter Title</label>
                <input
                  type="text"
                  id={`chapter-title-${index}`}
                  name={`chapter-title-${index}`}
                  placeholder="Enter the title for this chapter"
                  className="w-full rounded-md border border-zinc-300 p-2"
                  value={chapter.title}
                  onChange={(e) =>
                    handleUpdateChapter(index, "title", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`chapter-description-${index}`}>
                  Chapter Description
                </label>
                <textarea
                  rows={3}
                  id={`chapter-description-${index}`}
                  name={`chapter-description-${index}`}
                  placeholder="Enter the description for this chapter"
                  className="w-full rounded-md border border-zinc-300 p-2"
                  value={chapter.description}
                  onChange={(e) =>
                    handleUpdateChapter(index, "description", e.target.value)
                  }
                ></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <h4>Chapter Content</h4>
                <label
                  htmlFor={`chapter-content-${index}`}
                  className="cursor-pointer rounded-md border border-zinc-300 p-2 duration-200 hover:bg-zinc-100"
                >
                  {chapter.video.fileName || "Upload Video"}
                </label>

                <input
                  type="file"
                  hidden
                  onChange={(e) => handleUpdateChapterVideo(index, e)}
                  name={`chapter-content-${index}`}
                  id={`chapter-content-${index}`}
                  accept="video/*"
                  multiple={false}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddChapter}
            className="self-start rounded-md border border-blue-500 px-4 py-2 text-sm font-medium text-blue-500 duration-300 hover:bg-blue-50"
          >
            Add Chapter
          </button>
        </div>
        <button
          type="submit"
          disabled={cannotSubmit}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white duration-300 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-500/50"
        >
          {courseId ? "Update" : "Create"} Course
        </button>
      </form>
    </div>
  );
}
