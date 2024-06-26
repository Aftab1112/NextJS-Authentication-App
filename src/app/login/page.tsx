"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/buttonloading";
import { useToast } from "@/components/ui/use-toast";

interface User {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const onLogin = async () => {
    if (buttonDisabled) return;
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      const successMessage = response.data.message;
      router.push("/");
      toast({ title: successMessage });
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data.error
          : "Login Error";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isFormValid = user.email.length > 0 && user.password.length > 0;
    setButtonDisabled(!isFormValid);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-2 text-3xl font-semibold">Login</h1>

      <div className="w-[240px] py-3">
        <Input
          type="email"
          id="email"
          value={user.email}
          onChange={onChange}
          placeholder="Email"
        ></Input>
      </div>

      <div className="w-[240px] py-3">
        <Input
          type="password"
          id="password"
          value={user.password}
          onChange={onChange}
          placeholder="Password"
        ></Input>
      </div>

      <div className="py-3">
        {loading ? (
          <ButtonLoading>Logging In</ButtonLoading>
        ) : (
          <Button
            className="px-[51.5px]"
            variant="outline"
            size="lg"
            onClick={onLogin}
            disabled={buttonDisabled}
          >
            Login
          </Button>
        )}
      </div>

      <div className="flex items-center justify-center mt-3">
        <p className="ml-4">New user ?</p>
        <Button
          onClick={() => router.push("/signup")}
          className="text-base text-blue-300"
          variant="link"
        >
          Sign up here
        </Button>
      </div>

      <div className="flex items-center justify-center">
        <p className="ml-4">Forgot password ?</p>
        <Button
          className="text-base text-blue-300"
          variant="link"
          onClick={() => router.push("/forgotpassword")}
        >
          Reset here
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
