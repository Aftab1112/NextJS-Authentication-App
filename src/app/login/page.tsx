"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

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

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onLogin = async () => {
    try {
      setLoading(true);
      axios.post("/api/users/login", user);
      toast.success("Login successfull !");
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
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="mb-2 text-2xl ">{loading ? "Logging In..." : "Login"}</h1>

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
        onClick={onLogin}
      >
        {buttonDisabled ? "No Login" : "Login"}
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
