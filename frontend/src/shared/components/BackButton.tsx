import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const BackButton = () => {
  const handleBack = () => {
    history.back();
  };
  return (
    <div onClick={handleBack} className="ml-4 mb-6 flex w-fit cursor-pointer items-center gap-2 text-lg font-semibold hover:text-amber-500">
      <ArrowLeftIcon className="h-5 w-5" />
      <div>Back</div>
    </div>
  );
};

export default BackButton;
