import useAppDispatch from "@/shared/hooks/useAppDispatch";
import useAppSelector from "@/shared/hooks/useAppSelector";
import useLogout from "@/shared/hooks/useLogout";
import { setModalContent, setModalDisplay, setModalFeedback, setModalNeedFeedback } from "@/shared/models/modalSlice";
import { useEffect, useState } from "react";

const useLogoutDialog = () => {
  const { feedback } = useAppSelector((store) => store.modal);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const dispatch = useAppDispatch();
  const logout = useLogout();

  const handleLogoutDialog = () => {
    dispatch(setModalContent({ header: "Warning", message: "Logout?" }));
    dispatch(setModalNeedFeedback(true));
    dispatch(setModalDisplay(true));
    setLogoutDialog(true);
  };

  useEffect(() => {
    if (logoutDialog && feedback) {
      logout();
      dispatch(setModalFeedback(false));
    }

    setLogoutDialog(false);
  }, [feedback]);

  return handleLogoutDialog;
};

export default useLogoutDialog;
