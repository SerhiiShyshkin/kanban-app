'use client';

import BoardIcon from '@/app/features/board/components/BoardIcon';
import useToggleOpen from '@/lib/hooks/useToggleOpen';
import dynamic from 'next/dynamic';
import BoardForm from '@/app/features/board/components/BoardForm';
import Button from '@/app/components/Button';

const Modal = dynamic(() => import('@/app/components/Modal'), { ssr: false });

const AddBoard = () => {
  const { isOpen, setIsOpen } = useToggleOpen();

  return (
    <>
      <Button
        className="btn btn-text text-heading-md justify-start"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-4 fill-primaryPurple text-primaryPurple">
          <BoardIcon />
          <span>+ Add New Board</span>
        </div>
      </Button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <BoardForm onClose={() => setIsOpen(false)}></BoardForm>
        </Modal>
      )}
    </>
  );
};

export default AddBoard;
