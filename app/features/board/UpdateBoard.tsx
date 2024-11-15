"use client";

import useToggleOpen from "@/lib/hooks/useToggleOpen";
import BoardIcon from "./components/BoardIcon";
import AddBoardButton from "./components/AddBoardButton";
import BoardForm from "./components/BoardForm";
import Modal from "@/app/components/Modal";
import { Board, Column } from "@prisma/client";

type UpdateBoardProps = { board: (Board & { columns: Column[] }) | null };

const UpdateBoard = ({ board }: UpdateBoardProps) => {
  const { isOpen, setIsOpen } = useToggleOpen();

  return (
    <>
      <AddBoardButton setIsOpen={setIsOpen} />
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <BoardForm setIsOpen={setIsOpen} board={board} />
        </Modal>
      )}
    </>
  );  
};

export default UpdateBoard;
