import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingScreen from "../components/LoadingScreen";
import { CourseType } from "../components/CourseCard";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import NotFoundPage from "./NotFoundPage";

export default function CourseDetailsPage() {
  const { courseId } = useParams();

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

  return (
    <div className="mx-auto flex w-[90%] max-w-7xl flex-col gap-8 py-8 pb-80 md:flex-row">
      <div className="w-68 p-2 sm:order-2"></div>
      <div className="fixed top-23 right-[5%] flex h-fit w-full flex-col gap-2 rounded-md border border-zinc-100 bg-white p-3 shadow-md md:order-2 md:w-68">
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
      </div>
    </div>
  );
}
