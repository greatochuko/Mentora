import { createContext, useContext, useEffect, useState } from "react";
import { CourseType } from "../components/CourseCard";
import useFetch from "../hooks/useFetch";
import { useUserContext } from "./userContext";

export type CartItemType = {
  course: CourseType;
};

const cartContext = createContext<{
  cartItems: CartItemType[];
  cartLoading: boolean;
  addItemToCart(course: CourseType): void;
  removeItemFromCart(courseId: string): void;
}>({
  cartItems: [],
  cartLoading: true,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
});

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { user } = useUserContext();

  const { fetchData, loading: cartLoading } = useFetch({
    url: "/cart",
    startLoading: true,
    onSuccess(result) {
      setCartItems(result.data);
    },
    onFailure() {
      const localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(localStorageCart);
    },
  });

  useEffect(() => {
    async function getSession() {
      await fetchData();
    }

    getSession();
  }, []);

  async function addItemToCart(course: CourseType) {
    setCartItems((curr) => [...curr, { course }]);
    if (user) {
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        if (!BASE_URL) return;
        await fetch(`${BASE_URL}/api/v1/cart/add/${course._id}`, {
          method: "POST",
          credentials: "include",
        });
      } catch (err) {
        const error = err as Error;
        console.log(error.message);
      }
    } else {
      const localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");
      localStorageCart.push({ course });
      localStorage.setItem("cart", JSON.stringify(localStorageCart));
    }
  }

  async function removeItemFromCart(courseId: string) {
    setCartItems((curr) => curr.filter((item) => item.course._id !== courseId));
    if (user) {
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        if (!BASE_URL) return;
        await fetch(`${BASE_URL}/api/v1/cart/remove/${courseId}`, {
          method: "POST",
          credentials: "include",
        });
      } catch (err) {
        const error = err as Error;
        console.log(error.message);
      }
    } else {
      let localStorageCart: CartItemType[] = JSON.parse(
        localStorage.getItem("cart") || "[]",
      );
      localStorageCart = localStorageCart.filter(
        (item) => item.course._id !== courseId,
      );
      localStorage.setItem("cart", JSON.stringify(localStorageCart));
    }
  }

  return (
    <cartContext.Provider
      value={{ cartItems, cartLoading, addItemToCart, removeItemFromCart }}
    >
      {children}
    </cartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(cartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
}
