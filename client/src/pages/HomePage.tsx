import CategoriesSection from "../components/CategoriesSection";
import Hero from "../components/Hero";
import PopularCoursesSection from "../components/PopularCoursesSection";
import ReviewsSection from "../components/ReviewsSection";
import StatsSection from "../components/StatsSection";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col gap-16">
      <Hero />
      <div className="mx-auto flex w-9/10 max-w-7xl flex-col gap-16">
        <PopularCoursesSection />
        <StatsSection />
        <CategoriesSection />
        <ReviewsSection />
      </div>
    </main>
  );
}
