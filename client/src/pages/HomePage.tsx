import Hero from "../components/Hero";
import PopularCoursesSection from "../components/PopularCoursesSection";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 pb-80">
      <Hero />
      <div className="mx-auto flex w-9/10 max-w-7xl flex-col gap-8">
        <PopularCoursesSection />
      </div>
    </div>
  );
}
