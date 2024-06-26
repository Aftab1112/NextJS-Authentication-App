"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/ui/buttonloading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loading, setloading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "Invalid email address";
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const error = validateEmail(emailValue);
    setEmailError(error ? error : "");
    setButtonDisabled(!!error);
  };

  const onEmailSubmit = async () => {
    if (buttonDisabled) return;
    try {
      setloading(true);
      const response = await axios.post("/api/users/forgotpassword", { email });
      const successMessage = response.data.message;
      toast({ title: successMessage });
      router.push("/login");
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data.error
          : "Internal Server Error";
      toast({ variant: "destructive", title: errorMessage });
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!!validateEmail(email));
  }, [email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col justify-center items-center w-[310px]">
        <h1 className="mb-2 text-3xl font-semibold">Forgot Password</h1>
        <p className="mt-2 text-lg">
          Enter your email and we'll send <br />
        </p>
        <p className="text-lg">you a link to reset your password </p>
      </div>

      <div className="w-[240px] py-3 mt-3">
        <Input
          type="email"
          value={email}
          onChange={onChange}
          id="email"
          placeholder="Email"
        ></Input>
      </div>
      {emailError && <p className="mb-3 -mt-2 text-red-500">{emailError}</p>}

      <div className="py-3">
        {loading ? (
          <ButtonLoading>Submitting</ButtonLoading>
        ) : (
          <Button
            className="px-[46.5px]"
            variant="outline"
            size="lg"
            onClick={onEmailSubmit}
            disabled={buttonDisabled}
          >
            Submit
          </Button>
        )}
      </div>

      <div className="flex items-center justify-center mt-2">
        <Button
          className="text-base text-blue-300"
          variant="link"
          onClick={() => router.push("/login")}
        >
          Back to login page
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
