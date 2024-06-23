"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const VerifyEmailPage: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyemail", { token });
      const successMessage = response.data.message;
      toast.success(successMessage);
      setVerified(true);
      router.push("/");
    } catch (error) {
      setError(true);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Loader loading={loading} />
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="mt-3 text-2xl">
        {token ? `${token}` : "No token yet..."}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email verified</h2>
          <h2 className="text-2xl">Redirecting to login page...</h2>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl">Error verifying email..</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
