"use client";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ children, isOpen, setIsOpen }: ModalProps) => {
  return isOpen ? (
    <div
      className="fixed left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 z-50"
      onClick={(e) => {
        setIsOpen(false);
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[480px] p-8 bg-white rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
