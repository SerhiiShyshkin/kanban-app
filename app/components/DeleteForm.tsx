"use client";

type DeleteFormProps = {
  title: string;
  message: string;
  onSubmit: () => void;
  onCancel: (isOpen: boolean) => void;
};

const DeleteForm = ({ title, message, onSubmit, onCancel }: DeleteFormProps) => {
  const handleSubmit = () => {
    onSubmit();
    onCancel(false);
  };
  
  return (
    <form action={handleSubmit}>
      <div>{title}</div>
      <div>{message}</div>
      <button type="submit" className="btn-destructive">Delete</button>
      <button type="button" onClick={() => onCancel(false)}>
        Cancel
      </button>
    </form>
  );
};

export default DeleteForm;