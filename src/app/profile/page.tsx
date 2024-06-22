"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<string>("");

  const onLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/logout");
      const successMessage = response.data.message;
      toast.success(successMessage);
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        const errorMessage = error.response?.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Logout failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      setData(response.data.data._id);
      const successMessage = response.data.message;
      toast.success(successMessage);
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        const errorMessage = error.response?.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Logout failed");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Loader loading={loading} />
      <h1 className="text-2xl">Profile</h1>

      <h2 className="my-3 text-xl">
        {data === "" ? (
          "No user yet"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>

      <button
        className="px-4 py-2 mt-4 transition duration-200 bg-blue-800 rounded-lg cursor-pointer hover:bg-blue-600"
        onClick={onLogout}
      >
        Logout
      </button>

      <button
        className="px-4 py-2 mt-4 transition duration-200 bg-green-800 rounded-lg cursor-pointer hover:bg-green-600"
        onClick={getUserDetails}
      >
        Get User
      </button>
    </div>
  );
};

export default ProfilePage;
