'use client'


import DeleteForm from "@/app/components/DeleteForm";
import Modal from "@/app/components/Modal";
import useToggleOpen from "@/lib/hooks/useToggleOpen";
import {deleteBoardById} from "@/lib/server-actions/board-actions";


type DeleteBoardProps = {
    id: string;

};

const DeleteBoard = ({id}: DeleteBoardProps) => {
    const {isOpen, setIsOpen} = useToggleOpen();


    return (
        <>
            <button onClick={() => setIsOpen(true)}>Delete</button>
            {isOpen && (
                <Modal setIsOpen={setIsOpen}>
                    <DeleteForm
                        title="Delete this Board?"
                        message="Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed."
                        onCancel={setIsOpen}
                        onSubmit={() => deleteBoardById(id)}
                    />
                </Modal>
            )}
        </>
    );
};

export default DeleteBoard;

