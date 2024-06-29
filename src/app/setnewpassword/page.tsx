"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/ui/buttonloading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Passwords {
  password: string;
  confirmPassword: string;
}

interface PasswordsErros {
  password?: string;
  confirmPassword?: string;
}

const SetNewPasswordPage: React.FC = () => {
  const [passwords, setPasswords] = useState<Passwords>({
    password: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<PasswordsErros>({});
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] =
    useState<boolean>(false);
  const [buttonDisabled, setbuttonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [tokenExpiredError, setTokenExpiredError] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const validatePassword = (password: string): string | null =>
    password.length < 6 ? "Password must be at least 6 characters" : null;

  const validateConfirmPassword = (confirmPassword: string): string | null =>
    confirmPassword !== passwords.password ? "Passwords should match" : null;

  const togglePasswordVisibility = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setconfirmPasswordVisible(!confirmPasswordVisible);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setPasswords({ ...passwords, [id]: value });

    let error: string | null = null;

    switch (id) {
      case "password":
        error = validatePassword(value);
        break;
      case "confirmPassword":
        error = validateConfirmPassword(value);
        break;
      default:
        break;
    }
    setPasswordErrors({ ...passwordErrors, [id]: error });
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect((): void => {
    setbuttonDisabled(
      !(
        !validatePassword(passwords.password) &&
        !validateConfirmPassword(passwords.confirmPassword)
      )
    );
  }, [validatePassword, validateConfirmPassword]);

  const onPasswordsSubmit = async () => {
    if (buttonDisabled) return;
    try {
      setLoading(true);
      const response = await axios.post("/api/users/setnewpassword", {
        password: passwords.password,
        token,
      });
      toast({ title: "Password Changed Successfully" });
      router.push("/login");
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data.error
          : "Internal Server Error";
      toast({ variant: "destructive", title: errorMessage });
      setTokenExpiredError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-semibold ">Change Password</h1>
      <h2 className="mt-3 mb-5 text-xl font-medium">Set a new password </h2>

      <div className="w-[285px]  flex relative mt-4">
        <Input
          type={passwordVisible ? "text" : "password"}
          id="password"
          value={passwords.password}
          placeholder="Set new password"
          onChange={onChange}
        ></Input>
        {passwordVisible ? (
          <FaEye
            className="absolute right-0 mr-3 text-[25px] top-[9px] cursor-pointer"
            color="white"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <FaEyeSlash
            className="absolute right-0 mr-3 text-[25px] top-[9px] cursor-pointer"
            color="white"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {passwordErrors.password && (
        <p className="mt-2 text-red-500">{passwordErrors.password}</p>
      )}

      <div className="w-[285px] relative my-4">
        <Input
          type={confirmPasswordVisible ? "text" : "password"}
          id="confirmPassword"
          value={passwords.confirmPassword}
          placeholder="Confirm new password"
          onChange={onChange}
        ></Input>
        {confirmPasswordVisible ? (
          <FaEye
            className="absolute right-0 mr-3 text-[25px] top-[8px] cursor-pointer"
            color="white"
            onClick={toggleConfirmPasswordVisibility}
          />
        ) : (
          <FaEyeSlash
            className="absolute right-0 mr-3 text-[25px] top-[8px] cursor-pointer"
            color="white"
            onClick={toggleConfirmPasswordVisibility}
          />
        )}
      </div>
      {passwordErrors.confirmPassword && (
        <p className="text-red-500">{passwordErrors.confirmPassword}</p>
      )}

      <div className="mt-5">
        {loading ? (
          <ButtonLoading>Submitting</ButtonLoading>
        ) : (
          <Button
            className="px-[45.5px]"
            variant="outline"
            size="lg"
            disabled={buttonDisabled}
            onClick={onPasswordsSubmit}
          >
            Submit
          </Button>
        )}
      </div>

      <div className="w-[340px] mt-6">
        {tokenExpiredError && (
          <h2 className="text-lg text-center">
            Link is expired. <br /> Please visit
            <Button
              className="px-1 text-blue-300"
              variant="link"
              onClick={() => router.push("/forgotpassword")}
            >
              forgot password
            </Button>
            page
          </h2>
        )}
      </div>
    </div>
  );
};

export default SetNewPasswordPage;
