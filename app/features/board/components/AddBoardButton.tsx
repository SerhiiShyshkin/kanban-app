import BoardIcon from "./BoardIcon";

type AddBoardButtonProps = {
  setIsOpen: (isOpen: boolean) => void;
};

const AddBoardButton = ({ setIsOpen }: AddBoardButtonProps) => {
  return (
    <button className="btn-transparent" onClick={() => setIsOpen(true)}>
      <div className="flex items-center gap-4 fill-primaryPurple text-primaryPurple">
        <BoardIcon />
        <div>+ Add New Board</div>
      </div>
    </button>
  );
};

export default AddBoardButton;
