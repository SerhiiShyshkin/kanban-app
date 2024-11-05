"use client";

import { ReactNode } from "react";

type ButtonProps = {
  buttonStyle?: "primaryL" | "primaryS" | "secondary" | "destructive" | "transparent";
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  action?: () => void;
};

export const Button = ({ buttonStyle = "transparent", children, type, disabled = false, action }: ButtonProps) => {
  const style = {
    transparent: "text-sm text-primaryPurple font-bold leading-19 tracking-normal flex gap-4 items-center p-4 pl-8",
    primaryL:
      "bg-primaryPurple text-sm text-white font-bold leading-19 tracking-normal flex gap-4 items-center pt-[15px] pr-[61.5px] pb-[14px] pl-[61.5px] w-full rounded-s-3xl",
    primaryS:
      "bg-primaryPurple text-s text-white font-bold leading-23 tracking-normal flex gap-4 items-center pt-[8px] pr-[69.5px] pb-[9px] pl-[69.5px] w-full rounded-[20px]",
    secondary:
      "bg-primaryPurple bg-opacity-10 text-s text-primaryPurple font-bold leading-23 tracking-normal flex gap-4 justify-center items-center pt-[8px] pr-[69.5px] pb-[9px] pl-[69.5px] w-full rounded-[20px]",
    destructive:
      "bg-errorRed text-s text-white font-bold leading-23 tracking-normal flex gap-4 items-center pt-[8px] pr-[69.5px] pb-[9px] pl-[69.5px] w-full rounded-[20px]",
  }[buttonStyle];

  return (
    <button type={type} className={style} onClick={action} disabled={disabled}>
      {children}
    </button>
  );
};
