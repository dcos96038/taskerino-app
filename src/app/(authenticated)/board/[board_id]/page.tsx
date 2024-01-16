import { AddTaskModal } from "@/app/(authenticated)/board/[board_id]/add-task.modal";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { boardsService } from "@/services/boards";
import { createTask, deleteBoard } from "./actions";

export default async function BoardTasksPage({
  params,
}: {
  params: { board_id: string };
}) {
  const board = await boardsService.get(params.board_id);

  if (!board) throw new Error("Board not found");

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Board: {board.name}</h2>
        <div className="flex gap-1">
          <form action={deleteBoard}>
            <input type="hidden" value={params.board_id} name="boardId" />
            <Button type="submit" variant="danger">
              Delete Board
            </Button>
          </form>
          <AddTaskModal action={createTask} boardId={params.board_id} />
        </div>
      </div>
      <Table data={board.tasks} />
    </div>
  );
}
