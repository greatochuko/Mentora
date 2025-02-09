import { useEffect } from "react";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found - LearnEx";
  }, []);

  return (
    <div className="flex h-[calc(100dvh_-_13rem)] items-center justify-center">
      <h1>404 Not found!</h1>
    </div>
  );
}
