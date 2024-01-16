import { createTask } from "@/actions/tasks";
import { AddTaskModal } from "@/components/modal/add-task-modal";
import { Table } from "@/components/table";
import { boardsService } from "@/services/boards";

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
        <AddTaskModal action={createTask} boardId={params.board_id} />
      </div>
      <Table data={board.tasks} />
    </div>
  );
}
