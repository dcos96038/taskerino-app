import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";

export default async function HomeLayout({
  children,
  addTask,
}: {
  children: React.ReactNode;
  addTask: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <Link
          className="bg-white text-black rounded-md hover:bg-gray-200 transition-colors text-xs px-2 font-medium flex items-center gap-1 py-2"
          href="/add-task"
        >
          Add Task <CiCirclePlus className="text-lg stroke-1" />
        </Link>
      </div>
      {children}
      {addTask}
    </div>
  );
}
