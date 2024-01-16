import { Table } from "@/components/table";
import { CiCirclePlus } from "react-icons/ci";

function Loading() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="h-6 w-64 rounded bg-gray-400 animate-pulse"></div>
        <button className="bg-gray-300 cursor-not-allowed text-black rounded-md text-xs px-2 font-medium flex items-center gap-1 py-2">
          Add Task <CiCirclePlus className="text-lg stroke-1" />
        </button>
      </div>
      <Table loading />
    </div>
  );
}

export default Loading;
