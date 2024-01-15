"use client";

import { TaskLabel, TaskPriority, TaskStatus } from "@/types/tasks";
import { useFormState } from "react-dom";
import { createTask } from "./actions";
import { AddTaskSubmitButton } from "./submit-button";
import { Modal } from "@/components/ui/modal";

export function AddTaskModal() {
  const initialState = { message: null };

  const [state, formAction] = useFormState(createTask, initialState);

  return (
    <Modal title="Create a Task">
      <form action={formAction} className="flex flex-col gap-4">
        <input
          type="text"
          className="bg-transparent border border-gray-600 rounded-md py-2 px-3 text-sm w-full"
          placeholder="Task title..."
          name="title"
        />
        {state?.errors?.title ? (
          <div
            id="title-error"
            aria-live="polite"
            className="text-xs text-red-500"
          >
            {state.errors.title.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}

        <select
          name="priority"
          className="bg-transparent border border-gray-600 rounded-md py-2 px-2 text-sm w-full"
        >
          <option value="">Select a priority</option>
          {Object.keys(TaskPriority).map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
        {state?.errors?.priority ? (
          <div
            id="priority-error"
            aria-live="polite"
            className="text-xs text-red-500"
          >
            {state.errors.priority.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
        <select
          name="label"
          className="bg-transparent border border-gray-600 rounded-md py-2 px-2 text-sm sm:w-72"
        >
          <option value="">Select a label</option>
          {Object.keys(TaskLabel).map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
        {state?.errors?.label ? (
          <div
            id="label-error"
            aria-live="polite"
            className="text-xs text-red-500"
          >
            {state.errors.label.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
        <select
          name="status"
          className="bg-transparent border border-gray-600 rounded-md py-2 px-2 text-sm sm:w-72"
        >
          <option value="">Select a status</option>
          {Object.keys(TaskStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {state?.errors?.status ? (
          <div
            id="status-error"
            aria-live="polite"
            className="text-xs text-red-500"
          >
            {state.errors.status.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
        <div className="flex gap-4 justify-end">
          <AddTaskSubmitButton />
        </div>
      </form>
    </Modal>
  );
}
