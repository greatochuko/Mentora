import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

const userContext = createContext<{
  user: UserType | null;
  loadingSession: boolean;
}>({ user: null, loadingSession: true });

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const { fetchData } = useFetch({
    url: "/auth/session",
    onSuccess(result) {
      setUser(result.data);
    },
  });

  useEffect(() => {
    async function getSession() {
      setLoadingSession(true);
      await fetchData();
      setLoadingSession(false);
    }

    getSession();
  }, []);

  return (
    <userContext.Provider value={{ user, loadingSession }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
}
