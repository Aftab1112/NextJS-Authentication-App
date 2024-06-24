"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Passwords {
  password: string;
  confirmPassword: string;
}

interface PasswordsErros {
  password?: string;
  confirmPassword?: string;
}

const SetNewPasswordPage: React.FC = () => {
  const [passwords, setPasswords] = useState<Passwords>({
    password: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<PasswordsErros>({});
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] =
    useState<boolean>(false);
  const [buttonDisabled, setbuttonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [tokenExpiredError, setTokenExpiredError] = useState<boolean>(false);
  const router = useRouter();

  const validatePassword = (password: string): string | null => {
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const validateConfirmPassword = (confirmPassword: string): string | null => {
    if (confirmPassword !== passwords.password) return "Passwords should match";
    return null;
  };

  const togglePasswordVisibility = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const confirmPasswordVisibility = (): void => {
    setconfirmPasswordVisible(!confirmPasswordVisible);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setPasswords({ ...passwords, [id]: value });

    let error: string | null = null;

    switch (id) {
      case "password":
        error = validatePassword(value);
        break;
      case "confirmPassword":
        error = validateConfirmPassword(value);
        break;
      default:
        break;
    }
    setPasswordErrors({ ...passwordErrors, [id]: error });
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect((): void => {
    const isSubmitValid =
      !validatePassword(passwords.password) &&
      !validateConfirmPassword(passwords.confirmPassword);
    setbuttonDisabled(!isSubmitValid);
  }, [passwords]);

  const onPasswordsSubmit = async () => {
    if (buttonDisabled) return;
    try {
      setLoading(true);
      const response = await axios.post("/api/users/setnewpassword", {
        password: passwords.password,
        token,
      });
      const successMessage = response.data.message;
      toast.success(successMessage);
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
        setTokenExpiredError(true);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Loader loading={loading} />
      <h1 className="text-4xl">Change Password</h1>
      <h2 className="mt-3 text-xl">Set a new password </h2>

      <div className="relative flex">
        <input
          className="px-4 py-2 my-4 text-black border-none rounded-lg"
          type={passwordVisible ? "text" : "password"}
          id="password"
          value={passwords.password}
          placeholder="Set new password"
          onChange={onChange}
        />
        {passwordVisible ? (
          <FaEye
            className="absolute right-0 mr-3 text-[25px] top-[24px] cursor-pointer"
            color="black"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <FaEyeSlash
            className="absolute right-0 mr-3 text-[25px] top-[24px] cursor-pointer"
            color="black"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {passwordErrors.password && (
        <p className="text-red-500">{passwordErrors.password}</p>
      )}

      <div className="relative flex">
        <input
          className="px-4 py-2 my-4 text-black border-none rounded-lg"
          type={confirmPasswordVisible ? "text" : "password"}
          id="confirmPassword"
          value={passwords.confirmPassword}
          placeholder="Confirm new password"
          onChange={onChange}
        />
        {confirmPasswordVisible ? (
          <FaEye
            className="absolute right-0 mr-3 text-[25px] top-[24px] cursor-pointer"
            color="black"
            onClick={confirmPasswordVisibility}
          />
        ) : (
          <FaEyeSlash
            className="absolute right-0 mr-3 text-[25px] top-[24px] cursor-pointer"
            color="black"
            onClick={confirmPasswordVisibility}
          />
        )}
      </div>
      {passwordErrors.confirmPassword && (
        <p className="text-red-500">{passwordErrors.confirmPassword}</p>
      )}

      <button
        className={`px-6 py-2 mt-3 transition duration-200 ${
          buttonDisabled
            ? "bg-gray-400 cursor-default"
            : "bg-green-800 hover:bg-green-600"
        } rounded-lg `}
        onClick={onPasswordsSubmit}
      >
        Submit
      </button>

      <div className="w-[322px] mt-3">
        {tokenExpiredError && (
          <h2 className="text-center text-base">
            Link is expired. <br /> Please visit{" "}
            <Link href="/forgotpassword" className="text-blue-400">
              forgot password
            </Link>{" "}
            page
          </h2>
        )}
      </div>
    </div>
  );
};

export default SetNewPasswordPage;
