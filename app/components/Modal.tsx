"use client";

import BoardIcon from "../features/board/components/BoardIcon";

type ModalProps = {
  children: React.ReactNode;

  setIsOpen: (isOpen: boolean) => void;
};

const Modal = ({ children, setIsOpen }: ModalProps) => {
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 z-50" onClick={() => setIsOpen(false)}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[480px] p-8 bg-white rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
