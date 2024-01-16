import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";
import { deleteTask } from "./actions";

interface DeleteTaskButtonProps {
  taskId: number;
  boardId: string;
}

export const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({
  taskId,
  boardId,
}) => {
  return (
    <form action={deleteTask}>
      <input type="hidden" name="taskId" value={taskId} />
      <input type="hidden" name="boardId" value={boardId} />
      <Button
        type="submit"
        variant="icon"
        className="text-base bg-red-500 hover:bg-red-300 text-white"
      >
        <MdDeleteOutline />
      </Button>
    </form>
  );
};
