import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium">Boards</h2>
      <div className="grid grid-cols-3 gap-5 place-items-center">
        <div className="flex justify-between items-center py-2 px-4 bg-gray-900 border rounded-lg hover:bg-gray-700 cursor-pointer w-72">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Board 1</span>
            <span className="text-sm font-medium">14 Tasks</span>
          </div>
          <FaChevronRight />
        </div>
        <div className="flex justify-between items-center py-2 px-4 bg-gray-900 border rounded-lg hover:bg-gray-700 cursor-pointer w-72">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Board 1</span>
            <span className="text-sm font-medium">14 Tasks</span>
          </div>
          <FaChevronRight />
        </div>
        <div className="flex justify-between items-center py-2 px-4 bg-gray-900 border rounded-lg hover:bg-gray-700 cursor-pointer w-72">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Board 1</span>
            <span className="text-sm font-medium">14 Tasks</span>
          </div>
          <FaChevronRight />
        </div>
        <div className="flex justify-between items-center py-2 px-4 bg-gray-900 border rounded-lg hover:bg-gray-700 cursor-pointer w-72">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Board 1</span>
            <span className="text-sm font-medium">14 Tasks</span>
          </div>
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
