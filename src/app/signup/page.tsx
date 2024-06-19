"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

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

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSignUp = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
      toast.success("Sign up successful !");
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
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="mb-2 text-2xl ">{loading ? "Processing" : "Sign up"}</h1>

      <label htmlFor="username">username</label>
      <input
        className="p-2 rounded-lg border-none mt-1 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={onChange}
        placeholder="username"
      />

      <label htmlFor="email">email</label>
      <input
        className="p-2 rounded-lg border-none mt-1 text-black"
        type="email"
        id="email"
        value={user.email}
        onChange={onChange}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 rounded-lg border-none mt-1 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={onChange}
        placeholder="password"
      />

      <button
        className="py-2 px-4 bg-blue-800 rounded-lg mt-4 transition duration-200 hover:bg-blue-600"
        onClick={onSignUp}
      >
        {buttonDisabled ? "No Sign up" : "Sign up"}
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
