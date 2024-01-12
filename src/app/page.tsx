import { LogoutButton } from "@/components/auth/logout-button";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Invalid session");
  }

  return (
    <div className="flex flex-col px-10 py-6 gap-6">
      <div className="py-2 px-6 flex items-center justify-between bg-white rounded-md">
        <h1 className="text-lg font-bold text-black">ToDo App</h1>
        <div className="flex gap-2">
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
          className="bg-transparent border border-gray-600 rounded-md py-2 px-3 text-sm min-w-72"
          placeholder="Filter todos..."
        />
        <button
          type="button"
          className="bg-white text-black rounded-md hover:bg-gray-200 transition-colors text-xs px-2 font-medium flex items-center gap-1"
        >
          Add Todo <CiCirclePlus className="text-lg stroke-1" />
        </button>
      </div>
    </div>
  );
}
