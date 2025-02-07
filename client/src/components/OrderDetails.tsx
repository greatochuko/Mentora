import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export default function OrderDetails({ totalPrice }: { totalPrice: string }) {
  const { user } = useUserContext();

  return (
    <div className="flex flex-col gap-4 lg:w-72">
      <h1 className="text-lg font-medium sm:text-xl">Order Details</h1>
      <div className="rounded-lg border border-zinc-200 p-4">
        <p className="flex items-center justify-between">
          Total Price: <span className="font-medium">${totalPrice}</span>
        </p>
      </div>
      <Link
        to={user ? "/checkout" : "/login"}
        className="rounded-lg bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white duration-200 hover:bg-blue-600 sm:text-base"
      >
        {!user ? "Login to " : null}Proceed to Checkout
      </Link>
    </div>
  );
}
