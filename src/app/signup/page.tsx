"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

interface User {
  username: string;
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSignUp = async () => {
    if (buttonDisabled) return;

    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
      toast.success("Signed up successfully");
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log("Sign up failed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Loader loading={loading} />
      <h1 className="mb-2 text-2xl ">Sign up</h1>

      <label htmlFor="username">username</label>
      <input
        className="p-2 mt-1 text-black border-none rounded-lg"
        type="text"
        id="username"
        value={user.username}
        onChange={onChange}
        placeholder="username"
      />

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
        className={`px-4 py-2 mt-4 transition duration-200 ${
          buttonDisabled
            ? "bg-gray-400 cursor-default"
            : "bg-blue-800 hover:bg-blue-600"
        } rounded-lg `}
        onClick={onSignUp}
      >
        Sign up
      </button>

      <div className="flex mt-4">
        <p className="mr-2">Already a user ?</p>
        <Link className="text-blue-300" href="/login">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
