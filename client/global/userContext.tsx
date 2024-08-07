"use client";
import { getCurrentUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContextType, UserType } from "./types";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  loading: false,
});

export const useUserContext = () => useContext(UserContext);

const t = () => {
  const userDataString = localStorage.getItem("user");

  if (userDataString !== null) {
    try {
      return JSON.parse(userDataString);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  } else {
    console.error("User data not found in localStorage.");
  }

  return { email: "", password: "" };
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const { email } = t();
  if (email === "") router.replace("/login");
  // TODO: do not use localstorage

  useEffect(() => {
    getCurrentUser(email)
      .then((res) => {
        if (res.ok) {
          setIsLogged(true);
          res.json().then((data) => {
            // console.log(data);
            setUser(data);
          });
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        // throw Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
