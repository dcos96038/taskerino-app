import { AuthButton } from "@/components/auth-button";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <div className="py-4 px-8 flex items-center justify-between">
        <h1>ToDo App</h1>
        <AuthButton />
      </div>
    </div>
  );
}
