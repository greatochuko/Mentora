import { Link } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { useUserContext } from "../context/userContext";
import { CourseType } from "./CourseCard";

export default function AddToCartBtn({ course }: { course: CourseType }) {
  const { cartItems, cartLoading, addItemToCart, removeItemFromCart } =
    useCartContext();
  const { user, loadingSession } = useUserContext();

  const courseInCart = cartItems.find((item) => item.course._id === course._id);
  const userOwnsCourse = user?.paidCourses.some((c) => c === course._id);

  if (userOwnsCourse)
    return (
      <Link
        to={"/my-courses"}
        className="rounded-full border border-blue-500 px-3 py-1.5 text-sm font-medium text-blue-500 duration-200 hover:bg-blue-100 disabled:opacity-50"
      >
        Go to course
      </Link>
    );

  if (courseInCart)
    return (
      <button
        onClick={() => removeItemFromCart(course._id)}
        disabled={cartLoading}
        className="rounded-full border border-blue-500 px-3 py-1.5 text-sm font-medium text-blue-500 duration-200 hover:bg-blue-100 disabled:opacity-50"
      >
        Remove from cart
      </button>
    );

  return (
    <button
      onClick={() => addItemToCart(course)}
      disabled={cartLoading || loadingSession}
      className="rounded-full bg-blue-500 px-3 py-1.5 text-sm font-medium text-white duration-200 hover:bg-blue-600 disabled:opacity-50"
    >
      Add to cart
    </button>
  );
}
