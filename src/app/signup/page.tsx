"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

interface User {
  username: string;
  email: string;
  password: string;
}

interface UserErrors {
  username?: string;
  email?: string;
  password?: string;
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
  const [userErrors, setUserErrors] = useState<UserErrors>({});

  const validateUsername = (username: string): string | null => {
    if (username.length < 2) return "Username must be atleast 2 characters";
    return null;
  };

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address";
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 6) return "Password must be atleast 6 characters";
    return null;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });

    let error: string | null = null;

    switch (id) {
      case "username":
        error = validateUsername(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
      default:
        break;
    }

    setUserErrors({ ...userErrors, [id]: error });
  };

  const onSignUp = async () => {
    if (buttonDisabled) return;

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      const successMessage = response.data.message;
      toast.success(successMessage);
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      } else {
        toast.error("Signup Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isFormValid: boolean =
      !validateUsername(user.username) &&
      !validateEmail(user.email) &&
      !validatePassword(user.password);

    setButtonDisabled(!isFormValid);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Loader loading={loading} />
      <h1 className="mb-2 text-3xl tracking-wider">Sign up here</h1>

      <input
        className="px-4 py-2 my-4 text-black border-none rounded-lg"
        type="text"
        id="username"
        value={user.username}
        onChange={onChange}
        placeholder="username"
      />
      {userErrors.username && (
        <p className="mb-2 text-sm text-red-500">{userErrors.username}</p>
      )}

      <input
        className="px-4 py-2 my-4 mt-1 text-black border-none rounded-lg"
        type="email"
        id="email"
        value={user.email}
        onChange={onChange}
        placeholder="email"
      />
      {userErrors.email && (
        <p className="mb-2 text-sm text-red-500">{userErrors.email}</p>
      )}

      <input
        className="px-4 py-2 my-4 mt-1 text-black border-none rounded-lg"
        type="password"
        id="password"
        value={user.password}
        onChange={onChange}
        placeholder="password"
      />
      {userErrors.password && (
        <p className="mb-2 text-sm text-red-500">{userErrors.password}</p>
      )}

      <button
        className={`px-6 py-2 mt-3 transition duration-200 ${
          buttonDisabled
            ? "bg-gray-400 cursor-default"
            : "bg-blue-800 hover:bg-blue-600"
        } rounded-lg `}
        onClick={onSignUp}
      >
        Sign up
      </button>

      <div className="flex mt-5">
        <p className="mr-2 text-lg">Already a user ?</p>
        <Link className="text-lg text-blue-300" href="/login">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
