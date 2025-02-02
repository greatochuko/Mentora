import { useEffect, useRef, useState } from "react";
import CourseCard, { CourseType } from "./CourseCard";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const popularCourses: CourseType[] = [
  {
    _id: "1",
    title: "Complete Full-Stack Web Development",
    thumbnail:
      "https://media.licdn.com/dms/image/D5612AQFA87_WBhXUlg/article-cover_image-shrink_720_1280/0/1710942285800?e=2147483647&v=beta&t=Jgm-T4GK9bAhxW1E5AYUFn5JFK3Oj1mXmilUbw9kBcg",
    price: 2599,
    category: "Web Development",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "2",
    title: "Mastering React and Next.js",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D4E12AQEIqlkU8NSvJg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1692105491054?e=2147483647&v=beta&t=TmE4P7hBwEMLC-PROEmExcWzuVy4S4mAvZulxTqr5d4",
    price: 1899,
    category: "Web Development",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "3",
    title: "Node.js & Express Backend Development",
    thumbnail:
      "https://images.ctfassets.net/aq13lwl6616q/7cS8gBoWulxkWNWEm0FspJ/c7eb42dd82e27279307f8b9fc9b136fa/nodejs_cover_photo_smaller_size.png",
    price: 2099,
    category: "Web Development",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "4",
    title: "Modern JavaScript (ES6+)",
    thumbnail:
      "https://media2.dev.to/dynamic/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2F398a310kjdiv647cld1y.jpg",
    price: 1599,
    category: "Web Development",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "5",
    title: "UI/UX Design for Beginners",
    thumbnail: "https://i.ytimg.com/vi/N-xuqy6x1Bw/maxresdefault.jpg",
    price: 1899,
    category: "UI/UX",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "6",
    title: "Advanced Figma & Prototyping",
    thumbnail: "https://i.ytimg.com/vi/Tx45NcbU6aA/maxresdefault.jpg",
    price: 2299,
    category: "UI/UX",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "7",
    title: "User Research & Usability Testing",
    thumbnail:
      "https://media.nngroup.com/media/courses/opengraph_images/Course_UsabilityTesting.jpg",
    price: 2099,
    category: "UI/UX",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "8",
    title: "Design Systems & UI Components",
    thumbnail:
      "https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/8958602/og_image/optimized/design-system-68829a95a7e98aca4395388953988fd4.png",
    price: 2199,
    category: "UI/UX",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "9",
    title: "Copywriting for Conversions",
    thumbnail:
      "https://copyschool.co/wp-content/uploads/2022/10/Thumbnail_CC4B_3.png",
    price: 1799,
    category: "Copywriting",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "10",
    title: "SEO Content Writing Masterclass",
    thumbnail:
      "https://marketing-assets.surferseo.art/wf-cdn/5e09dd04ad6bad1923bf1aae/61dc6a53715b2ac1830e462d_SEO%20WM%202%20OG.jpg",
    price: 1699,
    category: "Copywriting",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "11",
    title: "Email Marketing Copywriting",
    thumbnail:
      "https://moosend.com/wp-content/uploads/2020/08/email_copywriting.png",
    price: 1999,
    category: "Copywriting",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "12",
    title: "Brand Storytelling & Messaging",
    thumbnail:
      "https://images.ctfassets.net/wshh1v3ruvt9/3TIUjOXg6U4Y9xKTExIuNs/c9b6817c96b7f472bb059e94d6c34d93/BrStorytellin_GuideArtboard_76_copy_28_2x.png",
    price: 2099,
    category: "Copywriting",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "13",
    title: "Entrepreneurship & Business Strategy",
    thumbnail:
      "https://media.licdn.com/dms/image/C4E12AQFglOI1zvy5xQ/article-cover_image-shrink_720_1280/0/1649309350200?e=2147483647&v=beta&t=JsqSiCbpT_u-U_wwP2UcVANIbtq7UqhleZt44jlqRdU",
    price: 2599,
    category: "Business",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "14",
    title: "Digital Marketing & Growth Hacking",
    thumbnail:
      "https://growthmaster.com/wp-content/uploads/2024/03/growth-hacking.jpeg",
    price: 2399,
    category: "Business",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "15",
    title: "E-commerce & Dropshipping Mastery",
    thumbnail:
      "https://merchize.com/wp-content/uploads/2024/10/Blue-and-Beige-Minimalist-Baby-Tips-Youtube-Thumbnail-10.png",
    price: 2499,
    category: "Business",
    rating: 4.6,
    numberOfReviews: 125,
  },
  {
    _id: "16",
    title: "Financial Planning for Startups",
    thumbnail:
      "https://www.pw.live/exams/wp-content/uploads/2024/07/Financial-Planning-for-Startups.jpg",
    price: 2299,
    category: "Business",
    rating: 4.6,
    numberOfReviews: 125,
  },
];

const popularCategories = Array.from(
  new Set(popularCourses.map((course) => course.category)),
);

export default function PopularCoursesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const courseGalleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    courseGalleryRef.current?.scroll({ left: 0 });
  }, [selectedCategory]);

  function handleScrollRight() {
    courseGalleryRef.current?.scrollBy({
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
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl font-medium sm:text-2xl md:text-3xl">
        Our Popular Courses
      </h2>
      <ul className="no-scrollbar flex max-w-full gap-4 overflow-x-auto">
        <li
          onClick={() => setSelectedCategory("All")}
          role="button"
          className={`cursor-pointer rounded-full border p-1 px-3 text-sm font-medium whitespace-nowrap duration-200 ${selectedCategory === "All" ? "border-zinc-300 bg-blue-600 text-white hover:bg-blue-500" : "border-zinc-200 text-zinc-500 hover:bg-zinc-100"}`}
        >
          {"All"}
        </li>
        {popularCategories.map((cat) => (
          <li
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            role="button"
            className={`cursor-pointer rounded-full border p-1 px-3 text-sm font-medium whitespace-nowrap duration-200 ${selectedCategory === cat ? "border-zinc-300 bg-blue-600 text-white hover:bg-blue-500" : "border-zinc-200 text-zinc-500 hover:bg-zinc-100"}`}
          >
            {cat}
          </li>
        ))}
      </ul>

      <div className="relative w-full">
        <div
          ref={courseGalleryRef}
          className="no-scrollbar flex w-full snap-x snap-mandatory grid-flow-col gap-4 overflow-x-auto"
        >
          {filteredCourses.map((course) => (
            <CourseCard
              course={course}
              key={course._id}
              className="min-w-60 flex-1 snap-start sm:min-w-64"
            />
          ))}
        </div>
        <button
          onClick={handleScrollLeft}
          className="absolute top-1/2 left-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-200 bg-white p-2 shadow-md duration-200 hover:bg-zinc-100"
        >
          <PiCaretLeftBold className="h-6 w-6" />
        </button>
        <button
          onClick={handleScrollRight}
          className="absolute top-1/2 right-0 z-20 -translate-y-1/2 translate-x-1/2 rounded-full border border-zinc-200 bg-white p-2 shadow-md duration-200 hover:bg-zinc-100"
        >
          <PiCaretRightBold className="h-6 w-6" />
        </button>
      </div>
      <Link
        to={
          selectedCategory === "All"
            ? "/courses"
            : `/courses?cat=${encodeURIComponent(selectedCategory)}`
        }
        className="rounded-md border border-blue-600 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-blue-600 duration-300 hover:bg-blue-600 hover:text-white"
      >
        See All
      </Link>
    </div>
  );
}
