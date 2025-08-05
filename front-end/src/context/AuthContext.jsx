"use client";

import {
  getUserApi,
  logoutApi,
  signinApi,
  signupApi,
} from "@/services/authService";
import { useRouter } from "next/navigation";

import { createContext, useReducer, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const Authcontext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "signin":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "signup":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "user/loaded":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action!");
  }
}

export default function AuthProvider({ children }) {
  const router = useRouter();

  const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  async function signup(values) {
    dispatch({ type: "loading" });
    try {
      const { user, message } = await signupApi(values);
      dispatch({ type: "signup", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  async function signin(values) {
    dispatch({ type: "loading" });
    try {
      const { user, message } = await signinApi(values);
      dispatch({ type: "signin", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  async function getUser() {
    dispatch({ type: "loading" });
    try {
      const { user } = await getUserApi();
      dispatch({ type: "user/loaded", payload: user });
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
    }
  }

  async function logout() {
    try {
      await logoutApi();
      router.push("/");
      dispatch({ type: "logout" });
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await getUser();
    }

    fetchData();
  }, []);

  return (
    <Authcontext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signin,
        signup,
        logout,
        getUser,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}

export function useAuth() {
  const context = useContext(Authcontext);
  if (context === undefined) throw new Error("not found Auth Context");
  return context;
}
