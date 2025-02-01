import { useState } from "react";
import { Link } from "react-router-dom";

export type CourseType = {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
};

export default function CourseCard({
  course,
  className,
}: {
  course: CourseType;
  className: string;
}) {
  const priceInDollars = (course.price / 100).toFixed(2);
  const wholePrice = priceInDollars.toString().split(".")[0];
  const centPrice = priceInDollars.toString().split(".")[1];

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`group flex flex-col rounded-md border border-zinc-300 p-1.5 shadow ${className}`}
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
        <div className="mt-auto flex items-center justify-between">
          <p>
            ${wholePrice} <sup>{centPrice}</sup>
          </p>
          <button className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-blue-600">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
