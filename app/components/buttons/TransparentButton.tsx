"use client";

import { ReactNode } from "react";

type TransparentButtonProps = {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  action: () => void;
};

export default function TransparentButton({ children, type, action }: TransparentButtonProps) {
  return (
    <button
      type={type}
      className="text-sm text-primaryPurple font-bold leading-19 tracking-normal flex gap-4 items-center p-4 pl-8"
      onClick={action}
    >
      {children}
    </button>
  );
}
