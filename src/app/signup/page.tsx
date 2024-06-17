"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

interface User {
  username: string;
  email: string;
  password: string | number;
}

const SignUpPage: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSignUp = async () => {};

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="mb-2 text-2xl ">Sign Up</h1>

      <label htmlFor="username">username</label>
      <input
        className="p-2 rounded-lg border-none mt-1"
        type="text"
        id="username"
        value={user.username}
        onChange={onChange}
        placeholder="username"
      />

      <label htmlFor="email">email</label>
      <input
        className="p-2 rounded-lg border-none mt-1"
        type="email"
        id="email"
        value={user.email}
        onChange={onChange}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 rounded-lg border-none mt-1"
        type="password"
        id="password"
        value={user.password}
        onChange={onChange}
        placeholder="password"
      />

      <button
        className="py-2 px-4 bg-blue-800 rounded-lg mt-4 transition duration-200 hover:bg-blue-600"
        onClick={onSignUp}
      >
        Sign Up
      </button>

      <div className="flex mt-4">
        <p className="mr-2">Already a user ?</p>
        <Link className="text-blue-300" href="/login">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
