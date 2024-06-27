"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const VerifyEmailPage: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyemail", { token });
      const successMessage = response.data.message;
      toast({ title: successMessage });
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
      toast({ variant: "destructive", title: errorMessage });
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
      {!loading && (
        <>
          <h1 className="mb-6 text-3xl text-center">Verify your email here</h1>
          {verified ? (
            <div className="mb-4 text-2xl">
              <p className="text-xl text-center">
                Email verification successfull
              </p>
              <p className="text-xl text-center">
                Redirecting to login page....
              </p>
            </div>
          ) : (
            <div className="mb-4 text-2xl">
              {error ? (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-xl text-center">
                    Link is expired. Please try again later
                  </p>
                  <Button
                    className="mt-2 text-lg text-blue-300"
                    variant="link"
                    onClick={() => router.push("/login")}
                  >
                    Back to login
                  </Button>
                </div>
              ) : (
                <p className="text-center">Verifying email...</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VerifyEmailPage;
