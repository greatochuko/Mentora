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

export const categories = [
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
