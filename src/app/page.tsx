import { LogoutButton } from "@/components/auth/logout-button";

export default async function Home() {
  return (
    <div className="flex flex-col px-10 py-6">
      <div className="py-2 px-6 flex items-center justify-between bg-white rounded-md">
        <h1 className="text-lg font-bold text-black">ToDo App</h1>
        <LogoutButton />
      </div>
    </div>
  );
}
