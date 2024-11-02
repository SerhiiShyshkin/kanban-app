"use client";
import { ModalContext } from "@/lib/context/modalContext";
import { ReactNode, useState } from "react";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const value = { isOpen, setIsOpen };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
