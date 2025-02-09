import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { Link } from "react-router-dom";

const socialLinks = [
  { href: "mailto:greatochuko123@gmail.com", Icon: MdMail },
  { href: "https://linkedin.com/in/greatochuko", Icon: FaLinkedinIn },
  { href: "https://github.com/greatochuko", Icon: FaGithub },
  { href: "https://x.com/greatochuko14", Icon: FaXTwitter },
];

export default function Footer() {
  return (
    <footer className="mt-12 flex flex-col items-center justify-between gap-2 bg-neutral-900 p-8 sm:flex-row">
      <Link to={"/"} className="text-lg font-medium text-white">
        LearnEx
      </Link>
      <p className="text-sm text-zinc-500">
        &copy;{new Date().getFullYear()} All Rights Reserved
      </p>
      <ul className="flex items-center gap-2">
        {socialLinks.map((socialLink, index) => (
          <li key={index}>
            <Link
              to={socialLink.href}
              className="block rounded-md p-2 duration-300 hover:bg-zinc-800"
            >
              <socialLink.Icon className="h-4 w-4 fill-white" />
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
