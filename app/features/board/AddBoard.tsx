'use client';

import useToggleOpen from '@/lib/hooks/useToggleOpen';
import dynamic from 'next/dynamic';
import BoardForm from '@/app/features/board/components/BoardForm';
import Button from '@/app/components/Button';
import { ReactNode } from 'react';

const Modal = dynamic(() => import('@/app/components/Modal'), { ssr: false });

type AddBoardProps = {
  children: ReactNode;
};

const AddBoard = ({ children }: AddBoardProps) => {
  const { isOpen, setIsOpen } = useToggleOpen();

  return (
    <>
      <Button
        type="button"
        className="btn btn-text text-heading-md justify-start"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-4 group1">{children}</div>
      </Button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <BoardForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default AddBoard;
