"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonLoading } from "@/components/ui/buttonloading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface UserData {
  username: string;
  email: string;
  isVerified: boolean;
}

const technologies = [
  { id: 1, name: "Next JS", logo: "/assets/nextjs.png" },
  { id: 2, name: "React JS", logo: "/assets/react.png" },
  { id: 3, name: "Typescript", logo: "/assets/typescript.png" },
  { id: 4, name: "Mongo DB", logo: "/assets/mongodb.png" },
  { id: 5, name: "Tailwind CSS", logo: "/assets/tailwind.png" },
  { id: 6, name: "ShadCN UI", logo: "/assets/shadcn.png" },
  { id: 7, name: "MaitTrap", logo: "/assets/mailtrap.png" },
  { id: 8, name: "Vercel", logo: "/assets/vercel.png" },
];

const HomePage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [logOutLoading, setLogOutLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | "">("");
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const onLogout = async () => {
    try {
      setLogOutLoading(true);
      await axios.get("/api/users/logout");
      toast({ title: "Logged Out Successfully" });
      router.push("/login");
    } catch (error) {
      toast({ variant: "destructive", title: "Logout Failed" });
    } finally {
      setLogOutLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      const user = response.data.data;
      if (user) {
        setUserData({
          username: user.username,
          email: user.email,
          isVerified: user.isVerified,
        });
      }
      const successMessage = response.data.message;
      toast({ title: successMessage });
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.message
          ? error.response?.data.error
          : "Internal Server Error";
      toast({ variant: "destructive", title: errorMessage });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full min-h-screen p-4 ">
      <div className="flex items-center justify-between w-full mb-8">
        <div className="flex justify-center flex-1 px-2">
          <h1 className="text-4xl font-medium text-center md:ml-52 ">
            A Next.JS Authentication App
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          {logOutLoading ? (
            <ButtonLoading>Logout</ButtonLoading>
          ) : (
            <Button
              className="px-[25px] h-10"
              variant="outline"
              onClick={onLogout}
            >
              Logout
            </Button>
          )}

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="py-[19px] px-5" variant="outline">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full ">
        <p className="text-lg">
          This application is designed to provide a seamless and secure
          authentication experience. Here&apos;s what you can expect :
        </p>
        <div className="w-[980px] mt-3">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base">
                User Registration and Login
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Easily sign up and log in with a secure authentication system
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base">
                Password Management
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Reset your password effortlessly if you ever forget it.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base">
                Email Verification
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Ensure the authenticity of your email address through a simple
                verification process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base">
                User Profile Management{" "}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                View and manage your profile details such as username and email
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="flex items-center justify-between w-full px-16 mt-4">
        <div>
          <p className="text-center text-base font-medium mb-[3px]">
            Technologis I Used
          </p>
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {technologies.map((tech, id) => (
                <CarouselItem key={id}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-6 aspect-square">
                        <div className="flex flex-col justify-between">
                          <Image
                            className="w-52 h-52"
                            src={tech.logo}
                            alt="logo"
                          />

                          <h1 className="mt-2 text-lg font-medium text-center">
                            {tech.name}
                          </h1>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div>
          <p className="text-center text-base font-medium mb-[3px]">Author</p>
          <Card>
            <CardContent className="flex flex-col h-[310.4px] w-[310.4px] items-center justify-center">
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <h1 className="text-xl font-medium text-center">Made by</h1>
                  <h1 className="text-4xl font-semibold text-center">AFTAB</h1>
                </div>
                <div className="flex items-center justify-center mt-4 space-x-10">
                  <div>
                    <a
                      href="https://github.com/Aftab1112"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-16 h-16"
                    >
                      <Image
                        src="/assets/github2.png"
                        alt="GitHub"
                        className="object-cover transition-all duration-300 rounded-full hover:-translate-y-2"
                      />
                    </a>
                    <p className="mt-1 text-sm text-center">Github</p>
                  </div>

                  <div>
                    <a
                      href="https://www.linkedin.com/in/aftabreshamwale/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-16 h-16"
                    >
                      <Image
                        src="/assets/linkedin.png"
                        alt="LinkedIn"
                        className="object-cover transition-all duration-300 rounded-full hover:-translate-y-2"
                      />
                    </a>
                    <p className="mt-1 text-sm text-center">LinkedIn</p>
                  </div>

                  <div>
                    <a
                      href="https://x.com/AReshamwale"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-16 h-16"
                    >
                      <Image
                        src="/assets/twitter.png"
                        alt="Twitter"
                        className="object-cover transition-all duration-300 rounded-full hover:-translate-y-2"
                      />
                    </a>
                    <p className="mt-1 text-sm text-center">Twitter</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <p className="text-center text-base font-medium mb-[3px]">
            User Details
          </p>
          <Card>
            <CardContent className="flex flex-col h-[310.4px] w-[310.4px] items-center justify-center">
              {userData ? (
                <>
                  <h1 className="mb-8 text-3xl font-medium text-center ">
                    Your Details
                  </h1>
                  <div className="flex flex-col items-start justify-center gap-2">
                    <p className="text-lg">Username : {userData.username}</p>
                    <p className="text-lg ">Email : {userData.email}</p>
                    <p className="text-lg ">
                      Email Verified : {userData.isVerified ? "Yes" : "No"}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="my-3 mb-10 text-xl font-medium text-center">
                    Click the button below to fetch your details
                  </p>

                  {loading ? (
                    <ButtonLoading>Getting Details</ButtonLoading>
                  ) : (
                    <Button
                      className="px-[47px] "
                      variant="outline"
                      size="lg"
                      onClick={getUserDetails}
                    >
                      Get details
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
