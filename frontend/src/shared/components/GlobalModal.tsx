import useAppDispatch from "@/shared/hooks/useAppDispatch";
import useAppSelector from "@/shared/hooks/useAppSelector";
import { resetModal, setModalFeedback } from "@/shared/models/modalSlice";
import { XCircleIcon } from "@heroicons/react/24/solid";

const GlobalModal = () => {
  const { display, content, needFeedback } = useAppSelector((store) => store.modal);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(resetModal());
  };

  const handleFeedback = () => {
    dispatch(resetModal());
    dispatch(setModalFeedback(true));
  };

  return (
    <>
      {display ? (
        <div className="fixed top-0 left-0 z-20 h-screen w-screen bg-black/60">
          <div className="absolute left-1/2 top-1/2 z-10 h-64 w-72 -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-100 md:w-96">
            <div className="h-10 rounded-t-md bg-green-700 py-2">
              <div className="mx-auto w-52 text-center uppercase text-white line-clamp-1">{content.header}</div>
            </div>
            <div onClick={handleClose} className="absolute top-2 right-3 cursor-pointer font-bold">
              <XCircleIcon className="h-7 w-7 text-red-700" />
            </div>
            <div className="mx-2 mt-2 flex h-36 items-center justify-center">
              <div className="mx-2 text-xl line-clamp-5">{content.message}</div>
            </div>
            {needFeedback ? (
              <div className="flex justify-evenly">
                <button onClick={handleFeedback} className="rounded-md border-2 border-slate-300 py-1 px-8 text-xl uppercase text-gray-700 hover:bg-slate-300">
                  Yes
                </button>
                <button onClick={handleClose} className="rounded-md bg-red-700 py-1 px-4 text-xl uppercase text-white hover:bg-red-800">
                  Cancel
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default GlobalModal;
