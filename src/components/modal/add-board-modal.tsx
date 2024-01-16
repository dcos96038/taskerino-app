"use client";

import { Modal } from "@/components/ui/modal";
import { insertBoardSchema } from "@/types/boards";
import { useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useQueryParam, withDefault, BooleanParam } from "use-query-params";

const requestSchema = insertBoardSchema.pick({
  name: true,
});

interface AddBoardModalProps {
  action: (formData: FormData) => Promise<void>;
}

export default function AddBoardModal({ action }: AddBoardModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<{
    name?: string[];
  }>();

  const [modal, setModal] = useQueryParam(
    "add-board",
    withDefault(BooleanParam, false),
  );

  const handleSubmit = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    const validatedData = requestSchema.safeParse({
      name: formData.get("name"),
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
        <Modal title="Create a Board">
          <form
            ref={formRef}
            action={action}
            className="flex flex-col gap-4 w-full"
          >
            <input
              type="text"
              className="bg-transparent border border-gray-600 rounded-md py-2 px-3 text-sm w-full"
              placeholder="Board Name..."
              name="name"
            />
            {errors?.name ? (
              <div
                id="name-error"
                aria-live="polite"
                className="text-xs text-red-500"
              >
                {errors.name.map((error: string) => (
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
                Add Board
              </button>
            </div>
          </form>
        </Modal>
      )}
      <button
        className="bg-white text-black rounded-md hover:bg-gray-200 transition-colors text-xs px-2 font-medium flex items-center gap-1 py-2"
        type="button"
        onClick={() => setModal(true)}
      >
        Add Board <CiCirclePlus className="text-lg stroke-1" />
      </button>
    </>
  );
}
