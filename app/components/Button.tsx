"use client";

import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  action?: () => void;
};

export const Button = ({ children, className, type, disabled = false, action }: ButtonProps) => {
  return (
    <button type={type} className={className} onClick={action} disabled={disabled}>
      {children}
    </button>
  );
};
