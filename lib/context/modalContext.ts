import { createContext, Dispatch, SetStateAction } from "react";

export interface ModalContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

/* export const ModalContextDefaultValue: ModalContextType = {
  isOpen: false,
  setIsOpen: () => false,
}; */

export const ModalContext = createContext<ModalContextType | null>(null);
