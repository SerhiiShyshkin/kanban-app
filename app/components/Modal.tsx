'use client';

import { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div
      className={`fixed left-0 visible right-0 top-0 bottom-0 mx-auto bg-black/60 z-50`}
      onClick={onClose}
    >
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
