import { BoardCardSkeletons } from "@/components/skeleton/board-card";
import { CiCirclePlus } from "react-icons/ci";

function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">Boards</h2>
        <button
          className="bg-gray-300 cursor-not-allowed text-black rounded-md text-xs px-2 font-medium flex items-center gap-1 py-2"
          type="button"
          disabled
        >
          Add Board <CiCirclePlus className="text-lg stroke-1" />
        </button>
      </div>
      <BoardCardSkeletons />
    </div>
  );
}

export default Loading;
