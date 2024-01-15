import { Table } from "@/components/table";
import { tasksService } from "@/services/tasks";

export default async function Home() {
  const tasks = await tasksService.getAll();

  return <Table data={tasks} />;
}
