import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingScreen from "../components/LoadingScreen";
import { CourseType } from "../components/CourseCard";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";
import NotFoundPage from "./NotFoundPage";

const courseContent = [
  {
    title: "Introduction to the Course",
    description: "Overview of what will be covered in the course.",
    lengthInSeconds: 300,
  },
  {
    title: "Getting Started with React",
    description:
      "Introduction to React and setting up the development environment.",
    lengthInSeconds: 1800,
  },
  {
    title: "Components and Props",
    description: "Understanding components and props in React.",
    lengthInSeconds: 2400,
  },
  {
    title: "State and Lifecycle",
    description: "Managing state and lifecycle methods in React.",
    lengthInSeconds: 2700,
  },
  {
    title: "Handling Events",
    description: "Handling events in React applications.",
    lengthInSeconds: 1500,
  },
  {
    title: "Conditional Rendering",
    description: "Implementing conditional rendering in React.",
    lengthInSeconds: 1200,
  },
  {
    title: "Lists and Keys",
    description: "Working with lists and keys in React.",
    lengthInSeconds: 1800,
  },
  {
    title: "Forms",
    description: "Building and managing forms in React.",
    lengthInSeconds: 2100,
  },
  {
    title: "Lifting State Up",
    description: "Techniques for lifting state up in React.",
    lengthInSeconds: 1800,
  },
  {
    title: "Composition vs Inheritance",
    description: "Understanding composition vs inheritance in React.",
    lengthInSeconds: 1500,
  },
];

const reviews = [
  {
    _id: "1",
    message: "Great course! Learned a lot.",
    rating: 5,
    createdAt: "2023-01-15",
    user: {
      firstName: "John",
      lastName: "Doe",
      profilePicture: "/default-profile-picture.png",
    },
  },
  {
    _id: "2",
    message: "Very informative and well structured.",
    rating: 4,
    createdAt: "2023-02-10",
    user: {
      firstName: "Jane",
      lastName: "Smith",
      profilePicture: "/default-profile-picture.png",
    },
  },
  {
    _id: "3",
    message: "Good course but could use more examples.",
    rating: 3,
    createdAt: "2023-03-05",
    user: {
      firstName: "Alice",
      lastName: "Johnson",
      profilePicture: "/default-profile-picture.png",
    },
  },
  {
    _id: "4",
    message: "Excellent content and delivery.",
    rating: 5,
    createdAt: "2023-04-20",
    user: {
      firstName: "Bob",
      lastName: "Brown",
      profilePicture: "/default-profile-picture.png",
    },
  },
  {
    _id: "5",
    message: "Helpful but a bit too fast-paced.",
    rating: 4,
    createdAt: "2023-05-18",
    user: {
      firstName: "Charlie",
      lastName: "Davis",
      profilePicture: "/default-profile-picture.png",
    },
  },
];

const totalCourseLength = courseContent.reduce(
  (acc, curr) => acc + curr.lengthInSeconds,
  0,
);

const averageRating =
  reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const hoursDisplay = hours > 0 ? `${hours}h ` : "";
  const minutesDisplay = minutes > 0 ? `${minutes}m` : "";
  return `${hoursDisplay}${minutesDisplay}`.trim();
}

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const { fetchData, data, loading } = useFetch({
    url: `/courses/id/${courseId}`,
    startLoading: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const course = data as CourseType;

  if (loading) return <LoadingScreen />;

  if (!course) return <NotFoundPage />;

  const courseRating =
    course.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
    course.reviews.length;

  const priceInDollars = (course.price / 100).toFixed(2);
  const wholePrice = priceInDollars.toString().split(".")[0];
  const centPrice = priceInDollars.toString().split(".")[1];

  function toggleSelectedChapter(chapterIndex: number) {
    if (selectedChapter === chapterIndex) {
      setSelectedChapter(null);
    } else {
      setSelectedChapter(chapterIndex);
    }
  }

  return (
    <main className="mx-auto w-[90%] max-w-7xl py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="top-8 right-[5%] flex h-fit w-full flex-col gap-2 rounded-md border border-zinc-100 bg-white p-3 shadow-md md:sticky md:order-2 md:w-68">
          <img
            src={course.thumbnail}
            alt="Course thumbnail"
            className="aspect-video w-full rounded-sm"
          />
          <p className="text-xl font-medium">
            ${wholePrice} <sup>{centPrice}</sup>
          </p>
          <button className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white duration-300 hover:bg-blue-600/90">
            Add to cart
          </button>
          <button className="rounded-md border border-blue-600 px-4 py-2 font-medium text-blue-600 duration-300 hover:bg-blue-50">
            Buy now
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <h1 className="text-2xl font-medium md:text-3xl">{course.title}</h1>
          <p className="flex items-center gap-1 text-sm sm:text-base">
            <FaStar className="h-4 w-4 fill-amber-500" />
            {courseRating || 0}
            <span className="text-zinc-500">
              ({course.reviews.length || "No reviews yet"})
            </span>
          </p>
          <p className="text-zinc-500">{course.description}</p>
          <div className="flex items-center gap-2">
            <img
              src={course.user.profilePicture}
              alt="course tutor profile picture"
              className="h-8 w-8 rounded-full"
            />
            <p>
              {course.user.firstName} {course.user.lastName}
            </p>
          </div>

          <section className="mt-4 flex flex-col gap-2">
            <h2 className="text-2xl font-medium">Course Content</h2>
            <p className="text-sm text-zinc-500">
              {courseContent.length} videos &bull;{" "}
              {formatTime(totalCourseLength)} total length
            </p>
            <div className="mt-2 rounded-lg border border-zinc-300">
              {courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border-b border-zinc-300 last:border-none"
                >
                  <div
                    className="flex cursor-pointer items-center p-4"
                    onClick={() => toggleSelectedChapter(index)}
                  >
                    {selectedChapter === index ? (
                      <FaChevronUp className="h-4 w-4" />
                    ) : (
                      <FaChevronDown className="h-4 w-4" />
                    )}
                    <h3 className="ml-2 font-medium">{chapter.title} </h3>
                    <span className="mx-2 ml-auto text-sm text-zinc-500">
                      {formatTime(chapter.lengthInSeconds)}
                    </span>
                  </div>
                  <p
                    className={`overflow-hidden px-4 text-sm text-zinc-500 duration-300 ${selectedChapter === index ? "h-fit pb-4" : "h-0"}`}
                  >
                    {chapter.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <section className="mt-4 flex flex-col gap-2">
        <h2 className="text-2xl font-medium">Reviews</h2>
        <p className="flex items-center gap-1 text-sm text-zinc-500">
          {reviews.length} reviews
          <FaStar className="h-4 w-4 fill-amber-500" />
          {averageRating.toFixed(2)}
        </p>
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="flex flex-col gap-2 rounded-lg border border-zinc-300 p-4 text-sm"
            >
              <div className="flex items-center gap-2">
                <img
                  src={review.user.profilePicture}
                  alt={`${review.user.firstName}'s profile picture`}
                  className="h-8 w-8 overflow-hidden rounded-full"
                />
                <p>
                  {review.user.firstName} {review.user.lastName}
                </p>
              </div>
              <p className="flex items-center gap-1 text-sm">
                <FaStar className="h-4 w-4 fill-amber-500" />
                {review.rating.toFixed(2)} &bull;
                <span className="text-zinc-500">
                  Reviewed on {new Date(review.createdAt).toDateString()}
                </span>
              </p>
              <p className="text-zinc-600">{review.message}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
