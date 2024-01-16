import AddBoardModal from "@/app/(authenticated)/(home)/add-board.modal";
import { BoardCard } from "@/components/ui/board-card";
import { boardsService } from "@/services/boards";
import { createBoard } from "./actions";

async function HomePage() {
  const boardsList = await boardsService.getAll();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">Boards</h2>
        <AddBoardModal action={createBoard} />
      </div>
      {boardsList.length > 0 ? (
        <div className="grid grid-cols-3 gap-5 place-items-center">
          {boardsList.map((board) => (
            <BoardCard
              key={board.id}
              id={board.id}
              name={board.name}
              tasks={board.tasks.length}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-white rounded-lg p-4">
          <h3 className="text-xl font-medium">No boards yet</h3>
        </div>
      )}
    </div>
  );
}

export default HomePage;
