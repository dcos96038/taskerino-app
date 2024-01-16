"use client";

import {
  TaskPriority,
  TaskLabel,
  TaskStatus,
  insertTaskSchema,
} from "@/types/tasks";
import { CiCirclePlus } from "react-icons/ci";
import { useQueryParam, withDefault, BooleanParam } from "use-query-params";
import { Modal } from "../ui/modal";
import { useRef, useState } from "react";

interface AddTaskModalProps {
  boardId: string;
  action: (formData: FormData) => Promise<void>;
}

const requestSchema = insertTaskSchema.pick({
  title: true,
  status: true,
  priority: true,
  label: true,
  boardId: true,
});

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  boardId,
  action,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<{
    title?: string[];
    priority?: string[];
    label?: string[];
    status?: string[];
  }>();

  const [modal, setModal] = useQueryParam(
    "add-task",
    withDefault(BooleanParam, false),
  );

  const handleSubmit = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    const validatedData = requestSchema.safeParse({
      title: formData.get("title"),
      status: formData.get("status"),
      priority: formData.get("priority"),
      label: formData.get("label"),
      boardId: formData.get("boardId"),
    });

    if (!validatedData.success) {
      setErrors(validatedData.error.flatten().fieldErrors);
      return;
    }

    formRef.current.requestSubmit();

    setModal(false);
  };

  return (
    <>
      {modal && (
        <Modal title="Create a Task">
          <form ref={formRef} action={action} className="flex flex-col gap-4">
            <input type="hidden" value={boardId} name="boardId" />
            <input
              type="text"
              className="bg-transparent border border-gray-600 rounded-md py-2 px-3 text-sm w-full"
              placeholder="Task title..."
              name="title"
            />
            {errors?.title ? (
              <div
                id="title-error"
                aria-live="polite"
                className="text-xs text-red-500"
              >
                {errors.title.map((error: string) => (
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
            {errors?.priority ? (
              <div
                id="priority-error"
                aria-live="polite"
                className="text-xs text-red-500"
              >
                {errors.priority.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
            <select
              name="label"
              className="bg-transparent border border-gray-600 rounded-md py-2 px-2 text-sm w-full"
            >
              <option value="">Select a label</option>
              {Object.keys(TaskLabel).map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
            {errors?.label ? (
              <div
                id="label-error"
                aria-live="polite"
                className="text-xs text-red-500"
              >
                {errors.label.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
            <select
              name="status"
              className="bg-transparent border border-gray-600 rounded-md py-2 px-2 text-sm w-full"
            >
              <option value="">Select a status</option>
              {Object.keys(TaskStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors?.status ? (
              <div
                id="status-error"
                aria-live="polite"
                className="text-xs text-red-500"
              >
                {errors.status.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
            <div className="flex gap-4 justify-end">
              <button
                className="bg-white disabled:bg-gray-400 disabled:cursor-not-allowed text-black rounded-md hover:bg-gray-200 transition-colors text-sm px-2 py-1 font-medium flex items-center"
                type="button"
                onClick={handleSubmit}
              >
                Add Task
              </button>
            </div>
          </form>
        </Modal>
      )}
      <button
        className="bg-white text-black rounded-md hover:bg-gray-200 transition-colors text-xs px-2 font-medium flex items-center gap-1 py-2"
        onClick={() => setModal(!modal)}
      >
        Add Task <CiCirclePlus className="text-lg stroke-1" />
      </button>
    </>
  );
};
