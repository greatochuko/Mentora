import { BsMegaphone } from "react-icons/bs";
import { FaPhotoVideo } from "react-icons/fa";
import { FaFigma, FaLaptopCode, FaRegChartBar } from "react-icons/fa6";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoMdBusiness } from "react-icons/io";
import {
  MdOutlineDesignServices,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import { RiLiveLine } from "react-icons/ri";
import { SiCyberdefenders } from "react-icons/si";
import { TfiWrite } from "react-icons/tfi";
import { Link } from "react-router-dom";

const categories = [
  { name: "Web Development", slug: "web-development", Icon: FaLaptopCode },
  { name: "UI/UX Design", slug: "ui-ux-design", Icon: FaFigma },
  {
    name: "Copywriting",
    slug: "copywriting",
    Icon: TfiWrite,
  },
  {
    name: "Content Creation",
    slug: "content-creation",
    Icon: RiLiveLine,
  },
  {
    name: "Business & Entrepreneurship",
    slug: "business-entrepreneurship",
    Icon: IoMdBusiness,
  },
  {
    name: "Cybersecurity & Ethical Hacking",
    slug: "cybersecurity-ethical-hacking",
    Icon: SiCyberdefenders,
  },
  {
    name: "Graphic Design",
    slug: "graphic-design",
    Icon: MdOutlineDesignServices,
  },
  {
    name: "Data Science & AI",
    slug: "data-science-ai",
    Icon: GiArtificialIntelligence,
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    Icon: BsMegaphone,
  },
  {
    name: "Finance & Investing",
    slug: "finance-investing",
    Icon: FaRegChartBar,
  },
  {
    name: "Photography & Video Editing",
    slug: "photography-video-editing",
    Icon: FaPhotoVideo,
  },
  {
    name: "Health & Wellness",
    slug: "health-wellness",
    Icon: MdOutlineHealthAndSafety,
  },
];

export default function CategoriesSection() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div>
        <h2 className="text-center text-xl font-medium sm:text-2xl md:text-3xl">
          Explore courses by category
        </h2>
        <p className="text-center text-sm text-zinc-500 sm:text-base">
          Browse top class courses by browsing through our categories
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.slice(0, 6).map((category) => (
          <li key={category.slug}>
            <Link
              to={`/categories/${category.slug}`}
              className="flex h-full gap-2 rounded-md border border-zinc-100 bg-white p-2 shadow-xs duration-300 hover:shadow-md"
            >
              <div className="flex aspect-square items-center justify-center rounded bg-blue-100 p-5">
                <category.Icon className="h-6 w-6 fill-blue-600" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <h3 className="text-lg font-medium">{category.name}</h3>
                <p className="text-sm text-zinc-500">170+ courses available</p>
              </div>
            </Link>
          </li>
        ))}
      </div>
      <Link
        to={"/categories"}
        className="rounded-md border border-blue-600 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-blue-600 duration-300 hover:bg-blue-600 hover:text-white"
      >
        All Categories
      </Link>
    </div>
  );
}
