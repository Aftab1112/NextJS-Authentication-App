"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

interface User {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onLogin = async () => {
    if (buttonDisabled) return;

    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log("Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Loader loading={loading} />
      <h1 className="mb-2 text-2xl ">Login</h1>

      <label htmlFor="email">email</label>
      <input
        className="p-2 mt-1 text-black border-none rounded-lg"
        type="email"
        id="email"
        value={user.email}
        onChange={onChange}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 mt-1 text-black border-none rounded-lg"
        type="password"
        id="password"
        value={user.password}
        onChange={onChange}
        placeholder="password"
      />

      <button
        className={`py-2 px-4 ${
          buttonDisabled
            ? "bg-gray-400 cursor-default"
            : "bg-blue-800 hover:bg-blue-600 "
        }  rounded-lg mt-4 transition duration-200 `}
        onClick={onLogin}
      >
        Login
      </button>

      <div className="flex mt-4">
        <p className="mr-2">New user ?</p>
        <Link className="text-blue-300" href="/signup">
          Sign up here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
