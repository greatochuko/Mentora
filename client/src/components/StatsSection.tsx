import { IoLibraryOutline } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudentFill } from "react-icons/pi";

const appStats = [
  {
    title: "10k+",
    subTitle: "total courses",
    Icon: IoLibraryOutline,
    className: "stroke-green-600",
  },
  {
    title: "500+",
    subTitle: "expert mentors",
    Icon: LiaChalkboardTeacherSolid,
    className: "fill-amber-500",
  },
  {
    title: "300k+",
    subTitle: "students globally",
    Icon: PiStudentFill,
    className: "fill-rose-400",
  },
];

export default function StatsSection() {
  return (
    <div className="grid gap-4 rounded-md bg-zinc-100 p-8 md:grid-cols-3">
      {appStats.map((stat) => (
        <div key={stat.title} className="flex gap-4">
          <div className="rounded-md bg-white p-4">
            <stat.Icon className={`h-8 w-8 ${stat.className}`} />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <h3 className="text-2xl font-semibold text-blue-600">
              {stat.title}
            </h3>
            <p className="text-zinc-500">{stat.subTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
