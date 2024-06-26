"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/ui/buttonloading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface User {
  username: string;
  email: string;
  password: string;
}

interface UserErrors {
  username?: string;
  email?: string;
  password?: string;
}

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [userErrors, setUserErrors] = useState<UserErrors>({});

  const validateUsername = (username: string): string | null =>
    username.length < 2 ? "Username must be atleast 2 characters" : null;

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address";
    return null;
  };

  const validatePassword = (password: string): string | null =>
    password.length < 6 ? "Password must be atleast 6 characters" : null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });

    let error: string | null = null;

    switch (id) {
      case "username":
        error = validateUsername(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
      default:
        break;
    }

    setUserErrors({ ...userErrors, [id]: error });
  };

  const onSignUp = async () => {
    if (buttonDisabled) return;

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(
      !(
        !validateUsername(user.username) &&
        !validateEmail(user.email) &&
        !validatePassword(user.password)
      )
    );
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-2 text-3xl font-semibold tracking-wider">
        Sign up here
      </h1>

      <div className="w-[240px] py-3">
        <Input
          type="text"
          id="username"
          value={user.username}
          onChange={onChange}
          placeholder="Username"
        ></Input>
      </div>
      {userErrors.username && (
        <p className="mb-2 text-sm text-red-500">{userErrors.username}</p>
      )}

      <div className="w-[240px] py-3">
        <Input
          type="email"
          id="email"
          value={user.email}
          onChange={onChange}
          placeholder="Email"
        ></Input>
      </div>
      {userErrors.email && (
        <p className="mb-2 text-sm text-red-500">{userErrors.email}</p>
      )}

      <div className="w-[240px] py-3">
        <Input
          type="password"
          id="password"
          value={user.password}
          onChange={onChange}
          placeholder="Password"
        ></Input>
      </div>
      {userErrors.password && (
        <p className="mb-2 text-sm text-red-500">{userErrors.password}</p>
      )}

      <div className="py-3">
        {loading ? (
          <ButtonLoading>Signing up</ButtonLoading>
        ) : (
          <Button
            className="px-[42.5px]"
            variant="outline"
            size="lg"
            onClick={onSignUp}
            disabled={buttonDisabled}
          >
            Sign up
          </Button>
        )}
      </div>

      <div className="flex items-center justify-center mt-1">
        <p className="ml-3">Alreay a user ?</p>
        <Button
          className="text-base text-blue-300"
          variant="link"
          onClick={() => router.push("/login")}
        >
          Login here
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
