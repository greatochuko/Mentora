import { useRef } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import ReviewCard, { ReviewType } from "./ReviewCard";

const reviews: ReviewType[] = [
  {
    _id: "1",
    title: "Amazing Learning Experience!",
    content:
      "The courses are well-structured and easy to follow. I love how interactive the lessons are!",
    user: {
      name: "Emily Johnson",
      profilePicture: "/emily.jpg",
      role: "Student",
    },
    rating: 4,
  },
  {
    _id: "2",
    title: "Great Platform for Tutors",
    content:
      "As a tutor, I appreciate the seamless course creation tools. The engagement from students is fantastic!",
    user: {
      name: "Michael Smith",
      profilePicture: "/michael.jpg",
      role: "Tutor",
    },
    rating: 4,
  },
  {
    _id: "3",
    title: "High-Quality Courses",
    content:
      "I've taken several courses here, and the quality of content is top-notch. Highly recommend!",
    user: {
      name: "Sophia Lee",
      profilePicture: "/sophia.jpg",
      role: "Student",
    },
    rating: 4,
  },
  {
    _id: "4",
    title: "User-Friendly Interface",
    content:
      "Navigating through courses and materials is super easy. A very intuitive platform!",
    user: {
      name: "Daniel Martinez",
      profilePicture: "/daniel.jpg",
      role: "Student",
    },
    rating: 4,
  },
  {
    _id: "5",
    title: "Great Earning Opportunity",
    content:
      "I started tutoring here recently, and it's been an incredible way to share my knowledge while earning.",
    user: {
      name: "Rachael Green",
      profilePicture: "/rachael.jpg",
      role: "Tutor",
    },
    rating: 4,
  },
  {
    _id: "6",
    title: "Highly Engaging Content",
    content:
      "The interactive quizzes and assignments make learning fun and effective. Love it!",
    user: {
      name: "David Brown",
      profilePicture: "/david.jpg",
      role: "Student",
    },
    rating: 4,
  },
  {
    _id: "7",
    title: "Flexible Learning",
    content:
      "I can learn at my own pace, which is perfect for my busy schedule. Great variety of courses too!",
    user: {
      name: "Olivia Wilson",
      profilePicture: "/olivia.jpg",
      role: "Student",
    },
    rating: 4,
  },
  {
    _id: "8",
    title: "Supportive Community",
    content:
      "The forums and discussion groups make it easy to ask questions and get feedback.",
    user: {
      name: "Chris Evans",
      profilePicture: "/chris.jpg",
      role: "Student",
    },
    rating: 4,
  },
  {
    _id: "9",
    title: "Seamless Course Uploading",
    content:
      "Uploading and managing courses is effortless. The tools provided make teaching online so smooth.",
    user: {
      name: "Dr. Mark Anderson",
      profilePicture: "/mark.jpg",
      role: "Tutor",
    },
    rating: 4,
  },
  {
    _id: "10",
    title: "Worth Every Penny",
    content:
      "The courses are affordable and provide immense value. I've learned more here than in traditional classrooms!",
    user: {
      name: "Sarah Thompson",
      profilePicture: "/sarah.jpg",
      role: "Student",
    },
    rating: 4,
  },
];

export default function ReviewsSection() {
  const courseGalleryRef = useRef<HTMLDivElement>(null);

  function handleScrollRight() {
    courseGalleryRef.current?.scrollBy({
      left: 256,
      behavior: "smooth",
    });
  }

  function handleScrollLeft() {
    if (!courseGalleryRef.current) return;

    courseGalleryRef.current.scrollBy({
      left: -256,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div>
        <h2 className="text-center text-xl font-medium sm:text-2xl md:text-3xl">
          Customer Story
        </h2>
        <p className="text-center text-sm text-zinc-500 sm:text-base">
          Our customers tell stories about our services provided
        </p>
      </div>

      <div className="relative w-full">
        <div
          ref={courseGalleryRef}
          className="no-scrollbar flex w-full snap-x snap-mandatory grid-flow-col gap-4 overflow-x-auto"
        >
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} className="min-w-64" />
          ))}
        </div>
        <button
          onClick={handleScrollLeft}
          className="absolute top-1/2 left-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-200 bg-white p-2 shadow-md duration-200 hover:bg-zinc-100"
        >
          <PiCaretLeftBold className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={handleScrollRight}
          className="absolute top-1/2 right-0 z-20 -translate-y-1/2 translate-x-1/2 rounded-full border border-zinc-200 bg-white p-2 shadow-md duration-200 hover:bg-zinc-100"
        >
          <PiCaretRightBold className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  );
}
