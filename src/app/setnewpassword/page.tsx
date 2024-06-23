"use client";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SetNewPasswordPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] =
    useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const confirmPasswordVisibility = (): void => {
    setconfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Change Password</h1>
      <h2 className="mt-3 text-xl">Set a new password </h2>

      <div className="relative flex">
        <input
          className="px-4 py-2 my-4 text-black border-none rounded-lg"
          type={passwordVisible ? "text" : "password"}
          id="password"
          placeholder="Set new password"
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

      <div className="relative flex">
        <input
          className="px-4 py-2 my-4 text-black border-none rounded-lg"
          type={confirmPasswordVisible ? "text" : "password"}
          id="confirmPassword"
          placeholder="Confirm new password"
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

      <button className="px-6 py-2 mt-3 transition duration-200 bg-green-800 rounded-lg hover:bg-green-600">
        Submit
      </button>
    </div>
  );
};

export default SetNewPasswordPage;
