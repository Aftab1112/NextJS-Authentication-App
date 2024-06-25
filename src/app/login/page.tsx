"use client";
import axios from "axios";
import Link from "next/link";
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
      toast({ description: successMessage });
      router.push("/");
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
      <h1 className="mb-2 text-3xl ">Login</h1>

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
          <ButtonLoading />
        ) : (
          <Button
            variant="outline"
            size="lg"
            onClick={onLogin}
            disabled={buttonDisabled}
          >
            Login
          </Button>
        )}
      </div>

      <div className="flex mt-4">
        <p className="mr-2">New user ?</p>
        <Link className="text-blue-300" href="/signup">
          Sign up here
        </Link>
      </div>

      <div className="flex mt-2">
        <p className="mr-2">Forgot password ?</p>
        <Link className="text-blue-300" href="/forgotpassword">
          Reset here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
