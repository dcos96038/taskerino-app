"use client";

import { Task, TaskLabel, TaskPriority, TaskStatus } from "@/types/tasks";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<Task>();

const columns: ColumnDef<Task>[] = [
  columnHelper.display({
    id: "taskId",
    header: "Task ID",
    cell: (props) => props.row.original.taskId,
  }),
  columnHelper.display({
    id: "title",
    header: "Title",
    cell: (props) => props.row.original.title,
  }),
  columnHelper.display({
    id: "status",
    header: "Status",
    cell: (props) => props.row.original.status,
  }),
  columnHelper.display({
    id: "priority",
    header: "Priority",
    cell: (props) => props.row.original.priority,
  }),
];

interface TableProps {
  data: Task[];
}

export const Table: React.FC<TableProps> = ({ data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel<Task>(),
  });

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  return (
    <div className="flow-root overflow-hidden rounded-lg border md:mt-8">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="group overflow-hidden ring-1 ring-black ring-opacity-5">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-900">
                {headerGroups.map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className="whitespace-nowrap py-3 pl-4 pr-3 text-left text-sm font-medium uppercase text-white"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-100 bg-transparent">
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          className="ml-1 whitespace-nowrap py-3 pl-4 pr-3 text-sm"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-3 pl-4 pr-3 text-sm text-center"
                    >
                      No tasks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
