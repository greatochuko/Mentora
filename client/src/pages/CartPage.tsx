import { FaStar } from "react-icons/fa";
import { useCartContext } from "../context/cartContext";
import { getCourseRating } from "../lib/utils";
import { Link } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import OrderDetails from "../components/OrderDetails";
import { useEffect } from "react";

export default function CartPage() {
  const { cartItems, removeItemFromCart, cartLoading } = useCartContext();

  useEffect(() => {
    document.title = `${cartItems.length > 0 ? `Cart (${cartItems.length})` : "Cart"} - LearnEx`;
  }, [cartItems]);

  if (cartLoading) return <LoadingPage />;

  const totalPrice = (
    cartItems.reduce((acc, curr) => acc + curr.course.price, 0) / 100
  ).toFixed(2);

  return (
    <main className="mx-auto flex w-[90%] max-w-7xl flex-1 flex-col gap-8 py-8 lg:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <h1 className="text-xl font-medium sm:text-2xl">Shopping Cart</h1>
        {cartItems.length < 1 ? (
          <div className="flex h-full flex-1 flex-col items-center justify-center text-zinc-500">
            You have no courses in your cart
            <Link to={"/courses"} className="text-blue-500 hover:underline">
              Keep shopping
            </Link>
          </div>
        ) : (
          cartItems.map(({ course }) => (
            <div
              key={course._id}
              className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-2 sm:flex-row sm:gap-4 sm:p-4"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="aspect-video rounded-sm object-cover sm:w-48"
              />
              <div className="flex flex-1 flex-col gap-1 text-sm sm:text-base">
                <h3 className="font-medium sm:text-lg">{course.title}</h3>
                <p className="text-zinc-600">
                  By {course.user.firstName} {course.user.lastName}
                </p>
                <p className="flex items-center gap-1 text-sm sm:text-base">
                  <FaStar className="h-4 w-4 fill-amber-500" />
                  {getCourseRating(course) || 0}
                  <span className="text-zinc-500">
                    ({course.reviews.length || "No reviews yet"})
                  </span>
                </p>
                <button
                  onClick={() => removeItemFromCart(course._id)}
                  className="w-fit rounded-lg p-2 text-sm text-red-500 duration-200 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && <OrderDetails totalPrice={totalPrice} />}
    </main>
  );
}
