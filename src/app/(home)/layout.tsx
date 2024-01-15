import { LogoutButton } from "@/components/auth/logout-button";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function HomeLayout({
  children,
  addTask,
}: {
  children: React.ReactNode;
  addTask: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Invalid session");
  }

  return (
    <div className="flex flex-col px-10 py-6 gap-6">
      <div className="py-2 px-3 sm:px-6 flex items-center justify-between bg-gray-900 border border-gray-100 rounded-md">
        <h1 className="sm:text-lg text-sm font-bold text-white">
          Taskerino App
        </h1>
        <div className="flex gap-4">
          <div className="overflow-hidden rounded-full">
            <Image
              src={session.user.image || ""}
              alt={`${session.user.name} avatar`}
              width={32}
              height={32}
            />
          </div>
          <LogoutButton />
        </div>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          className="bg-transparent border border-gray-600 rounded-md py-2 px-3 text-sm sm:w-72"
          placeholder="Filter tasks..."
        />
        <Link
          className="bg-white text-black rounded-md hover:bg-gray-200 transition-colors text-xs px-2 font-medium flex items-center gap-1"
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
