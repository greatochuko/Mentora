import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
};

const userContext = createContext<{
  user: UserType | null;
  loadingSession: boolean;
  updateUser: (newUser: UserType | null) => void;
}>({
  user: null,
  loadingSession: true,
  updateUser: () => {},
});

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

  function updateUser(newUser: UserType | null) {
    setUser(newUser);
  }

  return (
    <userContext.Provider value={{ user, loadingSession, updateUser }}>
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
