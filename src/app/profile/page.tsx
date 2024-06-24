"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";

interface UserData {
  username: string;
  email: string;
  isVerified: boolean;
}

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | "">("");

  const onLogout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logged Out Successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout Failed");
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      const user = response.data.data;
      if (user) {
        setUserData({
          username: user.username,
          email: user.email,
          isVerified: user.isVerified,
        });
      }
      const successMessage = response.data.message;
      toast.success(successMessage);
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.message
          ? error.response?.data.error
          : "Internal Server Error";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Loader loading={loading} />
      <h1 className="text-2xl">Your Profile</h1>

      {userData ? (
        <div className="my-3 text-xl">
          <p className="my-2 text-xl">Username : {userData.username}</p>
          <p className="mt-2 text-xl">Email : {userData.email}</p>
          <p className="mt-2 text-xl">
            Email Verified : {userData.isVerified ? "Yes" : "No"}
          </p>
        </div>
      ) : (
        <p className="my-3 text-xl">
          Click the button below to fetch your details
        </p>
      )}

      <button
        className="px-4 py-2 mt-4 transition duration-200 bg-green-800 rounded-lg cursor-pointer w-[116px] hover:bg-green-600"
        onClick={getUserDetails}
      >
        Get Details
      </button>

      <button
        className="px-4 py-2 mt-4 transition duration-200 bg-blue-800 rounded-lg cursor-pointer w-[116px] hover:bg-blue-600"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
