import { useState, useEffect, useRef } from "react";

const useToggleOpen = (initialIsOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const toggleOpen = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { isOpen, setIsOpen, toggleOpen, ref };
};

export default useToggleOpen;
