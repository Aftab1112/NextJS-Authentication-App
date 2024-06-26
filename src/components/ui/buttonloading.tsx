import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface ButtonLoadingProps {
  children: React.ReactNode;
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({ children }) => {
  return (
    <Button className="h-10 rounded-md" disabled>
      <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
      {children}
    </Button>
  );
};
