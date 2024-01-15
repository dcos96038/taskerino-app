import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface BoardCardProps {
  id: number;
  name: string;
  tasks: number;
}

export const BoardCard: React.FC<BoardCardProps> = ({ name, tasks, id }) => {
  return (
    <Link
      href={`/${id}`}
      className="flex justify-between gap-1 items-center line-clamp-1 py-2 px-4 bg-gray-900 border rounded-lg hover:bg-gray-700 w-72"
    >
      <div className="flex flex-col">
        <span className="text-xl font-bold">{name}</span>
        <span className="text-sm font-medium">{tasks} Tasks</span>
      </div>
      <FaChevronRight />
    </Link>
  );
};
