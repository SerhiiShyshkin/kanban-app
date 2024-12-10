'use client';

import DotsMenuIcon from '@/app/components/icons/DotsMenuIcon';
import Dropdown from '@/app/components/Dropdown';
import useToggleOpen from '@/lib/hooks/useToggleOpen';
import { Board } from '@/app/types';
import BoardForm from '@/app/features/board/components/BoardForm';
import Modal from '@/app/components/Modal';
import DeleteForm from '@/app/components/DeleteForm';
import DropdownItem from '@/app/components/DropdownItem';
import Button from '@/app/components/Button';

type BoardActionsProps = {
  board: Board | null;
};

const BoardActions = ({ board }: BoardActionsProps) => {
  const dropdownState = useToggleOpen();
  const editState = useToggleOpen();
  const deleteState = useToggleOpen();

  const handleEdit = () => {
    editState.setIsOpen(true);
    dropdownState.setIsOpen(false);
  };

  const handleDelete = () => {
    deleteState.setIsOpen(true);
    dropdownState.setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <Button type="button" onClick={dropdownState.toggleOpen}>
          <DotsMenuIcon />
        </Button>

        {dropdownState.isOpen && (
          <div className="absolute right-0 top-12">
            <Dropdown>
              <DropdownItem title="Edit Board" action={handleEdit} />
              <DropdownItem
                title="Delete Board"
                className=" text-errorRed"
                action={handleDelete}
              />
            </Dropdown>
          </div>
        )}
      </div>

      {editState.isOpen && (
        <Modal onClose={() => editState.setIsOpen(false)}>
          <BoardForm onClose={() => editState.setIsOpen(false)} board={board} />
        </Modal>
      )}

      {deleteState.isOpen && (
        <Modal onClose={() => deleteState.setIsOpen(false)}>
          <DeleteForm
            onClose={() => deleteState.setIsOpen(false)}
            title={board?.title}
            message={`ddhdhdhhd`}
            id={board?.id}
          />
        </Modal>
      )}
    </>
  );
};
export default BoardActions;
