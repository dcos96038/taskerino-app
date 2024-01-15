import { LogoutButton } from "@/components/auth/logout-button";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Invalid session");
  }

  return (
    <div className="flex flex-col px-10 py-6 gap-6">
      <div className="py-2 px-3 sm:px-6 flex items-center justify-between bg-gray-900 border border-gray-100 rounded-md">
        <Link href="/" className="sm:text-lg text-sm font-bold text-white">
          Taskerino App
        </Link>
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
      {children}
    </div>
  );
}
