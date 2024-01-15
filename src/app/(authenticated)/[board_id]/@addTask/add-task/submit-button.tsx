"use client";

import { useFormStatus } from "react-dom";

export const AddTaskSubmitButton = () => {
  const status = useFormStatus();

  return (
    <button
      type="submit"
      disabled={status.pending}
      className="bg-white disabled:bg-gray-400 disabled:cursor-not-allowed text-black rounded-md hover:bg-gray-200 transition-colors text-sm px-2 py-1 font-medium flex items-center"
    >
      Add Task
    </button>
  );
};
