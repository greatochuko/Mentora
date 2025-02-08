import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ReviewType } from "./ReviewCard";
import { UserType } from "../context/userContext";
import AddToCartBtn from "./AddToCartBtn";

export type CourseContentType = {
  title: string;
  description: string;
  video: { fileName: string; url: string; duration: number };
};

export type CourseType = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  price: number;
  category: string;
  reviews: ReviewType[];
  content: CourseContentType[];
  user: UserType;
  createdAt: string;
  updatedAt: string;
};

export default function CourseCard({
  course,
  className,
}: {
  course: CourseType;
  className?: string;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const priceInDollars = (course.price / 100).toFixed(2);
  const wholePrice = priceInDollars.toString().split(".")[0];
  const centPrice = priceInDollars.toString().split(".")[1];

  const courseRating =
    course.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
    course.reviews.length;

  return (
    <div
      className={`group flex flex-col rounded-md border border-zinc-300 bg-white p-1.5 shadow ${className}`}
    >
      <div className="overflow-hidden rounded-sm">
        <div
          className={`aspect-video animate-pulse rounded-sm bg-zinc-300 duration-300 ${imageLoaded ? "hidden" : "block"}`}
        ></div>
        <img
          src={course.thumbnail}
          alt={course.title}
          className={`aspect-video rounded-sm object-cover duration-300 group-hover:scale-105 ${imageLoaded ? "block" : "hidden"}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-2">
        <span className="text-sm text-zinc-500">{course.category}</span>
        <Link
          to={`/courses/${course._id}`}
          className="font-medium hover:underline"
        >
          {course.title}
        </Link>
        <p className="flex items-center gap-1 text-amber-500">
          {courseRating || 0} <FaStar className="h-4 w-4 fill-amber-500" />
          <span className="text-zinc-500">
            ({course.reviews.length || "No reviews yet"})
          </span>
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p className="font-semibold">
            ${wholePrice} <sup>{centPrice}</sup>
          </p>
          <AddToCartBtn course={course} />
        </div>
      </div>
    </div>
  );
}
