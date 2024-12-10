'use client';

import { deleteBoardById } from '@/lib/server-actions/board-actions';
import { FormEvent } from 'react';
import Button from '@/app/components/Button';

type DeleteFormProps = {
  title?: string;
  id?: string;
  message: string;

  onClose: () => void;
};

const DeleteForm = ({
  title,
  message,
  id,

  onClose,
}: DeleteFormProps) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) await deleteBoardById(id);
    //router.push(`${newPath}`);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{title}</div>
      <div>{message}</div>
      <div className="flex justify-between gap-4">
        <Button type="submit" className="btn btn-danger">
          Delete
        </Button>
        <Button
          type="button"
          className="btn btn-secondary"
          onClick={() => onClose()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default DeleteForm;
