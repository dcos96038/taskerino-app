"use client";

import { useRouter } from "next/navigation";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ModalProps {
  children: React.ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({ children, title }) => {
  const router = useRouter();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/90">
      <div className="bg-gray-900 border border-gray-500 px-10 py-8 rounded-md flex flex-col gap-6 max-w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">{title}</h2>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-3xl text-gray-300 hover:text-gray-400 transition-colors cursor-pointer"
          >
            <IoIosCloseCircleOutline />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
