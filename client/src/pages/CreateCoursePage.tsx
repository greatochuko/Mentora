import { useEffect, useState } from "react";
import { CourseContentType, CourseType } from "../components/CourseCard";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import { uploadFile } from "../lib/utils";
import LoadingIndicator from "../components/LoadingIndicator";

const categories = [
  "Business",
  "Copywriting",
  "UI/UX",
  "Web Development",
  "Marketing",
  "Data Science",
  "Cybersecurity",
  "Graphic Design",
  "Software Engineering",
  "Product Management",
];
export default function CreateCoursePage() {
  const { courseId } = useParams();

  const { fetchData, data, loading } = useFetch({
    url: `/courses/learning/${courseId}`,
    startLoading: !!courseId,
  });

  const course = data as CourseType | null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [chapters, setChapters] = useState<CourseContentType[]>([
    {
      title: "",
      description: "",
      video: { fileName: "", url: "", duration: 0 },
    },
  ]);

  const navigate = useNavigate();

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

      videoElement.onloadedmetadata = async () => {
        const duration = videoElement.duration;
        setUploadingVideo(true);
        const { url } = await uploadFile(file);
        setUploadingVideo(false);
        if (url) {
          const video = { fileName: file.name, url, duration };
          handleUpdateChapter(index, "video", video);
        }
      };
    }
  }

  const cannotSubmit =
    !title.trim() ||
    !description.trim() ||
    !thumbnail ||
    !category ||
    chapters.some(
      (chapter) =>
        !chapter.title.trim() ||
        !chapter.description.trim() ||
        !chapter.video.url,
    ) ||
    !price;

  function handleChangeThumbnail(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (reader.result) {
          setUploadingThumbnail(true);
          const { url } = await uploadFile(reader.result as string);
          setUploadingThumbnail(false);
          if (url) {
            setThumbnail(url);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleCreateCourse(event: React.FormEvent) {
    event.preventDefault();
    if (cannotSubmit) return;
    setCreatingCourse(true);
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      if (!BASE_URL) return;
      const res = await fetch(`${BASE_URL}/api/v1/courses`, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          thumbnail,
          category,
          price: price * 100,
          content: chapters,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate("/dashboard/courses");
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
    }
    setCreatingCourse(false);
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
            <label htmlFor="thumbnail">Course Thumbnail</label>
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-video max-w-60 rounded-lg object-cover"
              />
            ) : (
              <div className="aspect-video max-w-60 rounded-lg border border-zinc-300 bg-zinc-100"></div>
            )}
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              disabled={uploadingThumbnail}
              onChange={handleChangeThumbnail}
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
          <div className="flex flex-col gap-2">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-zinc-300 p-2"
            >
              <option value="" hidden>
                Select a Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
                  className={`cursor-pointer rounded-md border border-zinc-300 p-2 duration-200 hover:bg-zinc-100 ${uploadingVideo ? "cursor-not-allowed bg-zinc-100 text-zinc-500" : ""}`}
                >
                  {chapter.video.fileName || "Upload Video"}
                </label>

                <input
                  type="file"
                  hidden
                  disabled={uploadingVideo}
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

        <div className="flex flex-col gap-2">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter the price for this course"
            className="w-full rounded-md border border-zinc-300 p-2"
          />
        </div>

        <button
          type="submit"
          disabled={cannotSubmit || creatingCourse}
          className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white duration-300 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-500/50"
        >
          {creatingCourse ? (
            <LoadingIndicator />
          ) : courseId ? (
            "Update Course"
          ) : (
            "Create Course"
          )}
        </button>
      </form>
    </div>
  );
}
