import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingPage from "../components/LoadingPage";
import { useEffect } from "react";
import NotFoundPage from "./NotFoundPage";
import { FaCheck } from "react-icons/fa";

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");

  useEffect(() => {
    document.title = "Order Successful - LearnEx";
  }, []);

  const {
    fetchData,
    loading,
    data: order,
  } = useFetch({
    url: `/order/${orderId}`,
    startLoading: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingPage />;

  if (!order) return <NotFoundPage />;

  return (
    <main className="mx-auto flex w-[90%] max-w-7xl flex-1 flex-col items-center justify-center gap-4 py-8">
      <div className="rounded-full bg-green-600 p-8">
        <FaCheck className="h-20 w-20 fill-white" />
      </div>
      <h1 className="text-2xl font-medium sm:text-3xl">Order Complete</h1>
      <p className="text-center text-sm text-zinc-500">
        Your order has been successfully processed. Go to{" "}
        <Link to="/my-courses" className="text-blue-600 underline">
          My Courses
        </Link>{" "}
        page to view your courses.
      </p>
    </main>
  );
}
