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
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyemail", { token });
      toast.success(response.data.message);
      setVerified(true);
      setTimeout(() => {
        router.push("/login");
      }, 3200);
    } catch (error) {
      setError(true);
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data.error
          : "Internal server error";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (!token) {
      setError(true);
      setLoading(false);
    } else {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Loader loading={loading} />
      {!loading && (
        <>
          <h1 className="mb-6 text-4xl">Verify your email here</h1>
          {verified ? (
            <div className="mb-4 text-2xl">
              <p>Email verified successfully.</p>
              <p>Redirecting to login page...</p>
            </div>
          ) : (
            <div className="mb-4 text-2xl">
              {error ? (
                <p>Link expired. Please try again later.</p>
              ) : (
                <p>Verifying email...</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VerifyEmailPage;
