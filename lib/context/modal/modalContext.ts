import { createContext, Dispatch, SetStateAction } from "react";

export type ModalContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextType | null>(null);
