"use client";

import { useContext } from "react";
import { ModalContext } from "@/lib/context/modalContext";
import Modal from "@/app/components/Modal";
import AddBoardForm from "./components/AddBoardForm";
import TransparentButton from "../components/buttons/TransparentButton";
import { BoardIcon } from "../components/icons/BoardIcon";

export default function AddBoard() {
  const modalContext = useContext(ModalContext);

  const closeModal = () => {
    modalContext?.setIsOpen(false);
  };

  const openModal = () => {
    modalContext?.setIsOpen(true);
  };

  return (
    <>
      <TransparentButton type="button" action={openModal}>
        <BoardIcon color="#635FC7"></BoardIcon>
        <>+ Create New Board</>
      </TransparentButton>

      {modalContext && (
        <Modal>
          <AddBoardForm action={closeModal} />
        </Modal>
      )}
    </>
  );
}
