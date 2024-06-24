"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loading, setloading] = useState<boolean>(false);
  const router = useRouter();

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address";
    return null;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const error = validateEmail(emailValue);
    setEmailError(error ? error : "");
    if (!error) {
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    const isEmailValid = !validateEmail(email);
    setButtonDisabled(!isEmailValid);
  }, [email]);

  const onEmailSubmit = async () => {
    if (buttonDisabled) return;

    try {
      setloading(true);
      const response = await axios.post("/api/users/forgotpassword", { email });
      const successMessage = response.data.message;
      toast.success(successMessage);
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Loader loading={loading} />
      <div className="flex flex-col justify-center items-center w-[320px]">
        <h1 className="mb-2 text-3xl">Forgot Password</h1>
        <p className="">Enter your email and we'll send you a link </p>
        <p>to reset your password</p>
      </div>

      <input
        className="px-4 py-2 my-4 text-black border-none rounded-lg"
        type="email"
        value={email}
        onChange={onChange}
        id="email"
        placeholder="email"
      />
      {emailError && <p className="mb-3 -mt-2 text-red-500">{emailError}</p>}

      <button
        className={`px-6 py-2 mt-3 transition duration-200 ${
          buttonDisabled
            ? "bg-gray-400 cursor-default"
            : "bg-green-800 hover:bg-green-600"
        } rounded-lg `}
        onClick={onEmailSubmit}
      >
        Submit
      </button>

      <Link className="mt-5 text-blue-300" href="/login">
        Back to login
      </Link>
    </div>
  );
};

export default ForgotPasswordPage;
