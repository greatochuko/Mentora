import Hero from "../components/Hero";
import PopularCourses from "../components/PopularCourses";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 pb-80">
      <Hero />
      <div className="mx-auto flex w-9/10 max-w-7xl flex-col gap-8">
        <PopularCourses />
      </div>
    </div>
  );
}
