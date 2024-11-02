"use client";

import { ModalContext } from "@/lib/context/modalContext";
import { createContext, useContext, useState } from "react";

export default function Modal({ children}: { children: React.ReactNode }) {
  const context = useContext(ModalContext);
  

  return (
    <>
      {context?.isOpen && (
        <>
          <div
            className="fixed z-0 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
            onClick={() => context?.setIsOpen(false)}
            
          ></div>
          <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-8 bg-white rounded-md">
            {children}
          </div>
        </>
      )}
    </>
  );
}
