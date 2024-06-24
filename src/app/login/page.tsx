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
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const onLogin = async () => {
    if (buttonDisabled) return;
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      const successMessage = response.data.message;
      toast.success(successMessage);
      router.push("/");
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data.error
          : "Login Error";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isFormValid = user.email.length > 0 && user.password.length > 0;
    setButtonDisabled(!isFormValid);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Loader loading={loading} />
      <h1 className="mb-2 text-3xl ">Login</h1>

      <input
        className="px-4 py-2 my-4 text-black border-none rounded-lg"
        type="email"
        id="email"
        value={user.email}
        onChange={onChange}
        placeholder="Email"
      />

      <input
        className="px-4 py-2 my-4 text-black border-none rounded-lg"
        type="password"
        id="password"
        value={user.password}
        onChange={onChange}
        placeholder="Password"
      />

      <button
        className={`py-2 px-6 ${
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

      <div className="flex mt-2">
        <p className="mr-2">Forgot password ?</p>
        <Link className="text-blue-300" href="/forgotpassword">
          Reset here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
