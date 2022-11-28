import { TrashIcon } from "@heroicons/react/24/outline";
import { MouseEvent } from "react";

type DataCardProps = {
  title1: string;
  field1: string;
  title2: string;
  field2: string;
  handleDelete: () => void;
};

const DataCard = ({ title1, title2, field1, field2, handleDelete }: DataCardProps) => {
  const handleDeleteButton = (e: MouseEvent) => {
    e.preventDefault();
    handleDelete();
  };
  return (
    <div className="flex rounded-lg bg-neutral-50 p-2 shadow-md">
      <div className="grow">
        <div>
          <span className="pl-1 text-sm">{title1}</span>
          <div className="rounded-sm bg-gray-300 p-1 line-clamp-1">{field1}</div>
        </div>
        <div className="mt-2">
          <span className="pl-1 text-sm">{title2}</span>
          <div className="rounded-sm bg-gray-300 p-1 line-clamp-1">{field2}</div>
        </div>
      </div>
      <div onClick={handleDeleteButton} className="flex w-fit items-center border-l px-3 pt-3 hover:bg-slate-300">
        <TrashIcon className="h-6 w-6 text-red-500" />
      </div>
    </div>
  );
};

export default DataCard;
