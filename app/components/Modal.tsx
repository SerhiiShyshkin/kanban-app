"use client";

import { useState } from "react";

export default function Modal({ children, title }: { children: React.ReactNode; title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={() => handleIsOpen()}>{title}</button>
      {isOpen && (
        <div className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-8 bg-white rounded-md">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
