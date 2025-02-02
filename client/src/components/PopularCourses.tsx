import { useRef, useState } from "react";
import CourseCard, { CourseType } from "./CourseCard";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

const popularCourses: CourseType[] = [
  {
    _id: "1",
    title: "Complete Full-Stack Web Development",
    thumbnail:
      "https://media.licdn.com/dms/image/D5612AQFA87_WBhXUlg/article-cover_image-shrink_720_1280/0/1710942285800?e=2147483647&v=beta&t=Jgm-T4GK9bAhxW1E5AYUFn5JFK3Oj1mXmilUbw9kBcg",
    price: 2599,
    category: "Web Development",
  },
  {
    _id: "2",
    title: "Mastering React and Next.js",
    thumbnail: "https://example.com/react-next.jpg",
    price: 1899,
    category: "Web Development",
  },
  {
    _id: "3",
    title: "Node.js & Express Backend Development",
    thumbnail: "https://example.com/node-express.jpg",
    price: 2099,
    category: "Web Development",
  },
  {
    _id: "4",
    title: "Modern JavaScript (ES6+)",
    thumbnail: "https://example.com/javascript.jpg",
    price: 1599,
    category: "Web Development",
  },
  {
    _id: "5",
    title: "UI/UX Design for Beginners",
    thumbnail: "https://example.com/uiux-beginners.jpg",
    price: 1899,
    category: "UI/UX",
  },
  {
    _id: "6",
    title: "Advanced Figma & Prototyping",
    thumbnail: "https://example.com/figma-prototyping.jpg",
    price: 2299,
    category: "UI/UX",
  },
  {
    _id: "7",
    title: "User Research & Usability Testing",
    thumbnail: "https://example.com/user-research.jpg",
    price: 2099,
    category: "UI/UX",
  },
  {
    _id: "8",
    title: "Design Systems & UI Components",
    thumbnail: "https://example.com/design-systems.jpg",
    price: 2199,
    category: "UI/UX",
  },
  {
    _id: "9",
    title: "Copywriting for Conversions",
    thumbnail: "https://example.com/conversion-copywriting.jpg",
    price: 1799,
    category: "Copywriting",
  },
  {
    _id: "10",
    title: "SEO Content Writing Masterclass",
    thumbnail: "https://example.com/seo-content.jpg",
    price: 1699,
    category: "Copywriting",
  },
  {
    _id: "11",
    title: "Email Marketing Copywriting",
    thumbnail: "https://example.com/email-copywriting.jpg",
    price: 1999,
    category: "Copywriting",
  },
  {
    _id: "12",
    title: "Brand Storytelling & Messaging",
    thumbnail: "https://example.com/brand-storytelling.jpg",
    price: 2099,
    category: "Copywriting",
  },
  {
    _id: "13",
    title: "Entrepreneurship & Business Strategy",
    thumbnail: "https://example.com/entrepreneurship.jpg",
    price: 2599,
    category: "Business",
  },
  {
    _id: "14",
    title: "Digital Marketing & Growth Hacking",
    thumbnail: "https://example.com/digital-marketing.jpg",
    price: 2399,
    category: "Business",
  },
  {
    _id: "15",
    title: "E-commerce & Dropshipping Mastery",
    thumbnail: "https://example.com/ecommerce.jpg",
    price: 2499,
    category: "Business",
  },
  {
    _id: "16",
    title: "Financial Planning for Startups",
    thumbnail: "https://example.com/financial-planning.jpg",
    price: 2299,
    category: "Business",
  },
];

const popularCategories = Array.from(
  new Set(popularCourses.map((course) => course.category)),
);

export default function PopularCourses() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const courseGalleryRef = useRef<HTMLDivElement>(null);

  function handleScrollRight() {
    if (!courseGalleryRef.current) return;

    courseGalleryRef.current.scrollBy({
      left: 240,
      behavior: "smooth",
    });
  }

  function handleScrollLeft() {
    if (!courseGalleryRef.current) return;

    courseGalleryRef.current.scrollBy({
      left: -240,
      behavior: "smooth",
    });
  }

  const filteredCourses =
    selectedCategory === "All"
      ? popularCourses
      : popularCourses.filter((course) => course.category === selectedCategory);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-medium sm:text-2xl md:text-3xl">
        Our Popular Courses
      </h2>
      <ul className="no-scrollbar flex max-w-full gap-4 overflow-x-auto">
        <li
          onClick={() => setSelectedCategory("All")}
          role="button"
          className={`cursor-pointer rounded-full border p-1 px-3 text-sm font-medium whitespace-nowrap duration-200 hover:bg-zinc-50 ${selectedCategory === "All" ? "border-zinc-300 bg-zinc-100" : "border-zinc-200 text-zinc-500"}`}
        >
          {"All"}
        </li>
        {popularCategories.map((cat) => (
          <li
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            role="button"
            className={`cursor-pointer rounded-full border border-zinc-200 p-1 px-3 text-sm font-medium whitespace-nowrap duration-200 hover:bg-zinc-50 ${selectedCategory === cat ? "bg-zinc-100" : "text-zinc-500"}`}
          >
            {cat}
          </li>
        ))}
      </ul>

      <div className="relative w-full">
        <div
          ref={courseGalleryRef}
          className="no-scrollbar grid w-full snap-x snap-mandatory grid-flow-col gap-4 overflow-x-auto"
        >
          {filteredCourses.map((course) => (
            <CourseCard
              course={course}
              key={course._id}
              className="w-60 snap-start snap-always sm:w-64"
            />
          ))}
        </div>
        <button
          onClick={handleScrollLeft}
          className="absolute top-1/2 left-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-300 bg-white p-2 duration-200 hover:shadow"
        >
          <PiCaretLeftBold />
        </button>
        <button
          onClick={handleScrollRight}
          className="absolute top-1/2 right-0 z-20 -translate-y-1/2 translate-x-1/2 rounded-full border border-zinc-300 bg-white p-2 duration-200 hover:shadow"
        >
          <PiCaretRightBold />
        </button>
      </div>
    </div>
  );
}
