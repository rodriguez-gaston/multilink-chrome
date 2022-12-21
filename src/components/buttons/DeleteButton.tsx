import Delete from "../icons/Delete";

interface Props {
  onDelete: () => void;
}

const DeleteButton = ({ onDelete }: Props) => {
  return (
    <button
      onClick={onDelete}
      className="flex items-center justify-center gap-2 p-2"
    >
      <span className="sr-only">Delete</span>
      <Delete />
    </button>
  );
};

export default DeleteButton;
