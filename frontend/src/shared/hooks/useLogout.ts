import useGetUserProfile from "@/entities/user/hooks/useGetUserProfile";
import { deleteAuth } from "@/features/auth/models/authSlice";
import { useLogoutApi } from "@/shared/api/auth";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import { setModalContent, setModalDisplay } from "@/shared/models/modalSlice";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { removeProfile } = useGetUserProfile();
  const logoutApi = useLogoutApi();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: (data: UserCred) => {
      dispatch(setModalContent({ header: "Message", message: "You are succesfully logged out!" }));
      dispatch(setModalDisplay(true));
      navigate("/");
      dispatch(deleteAuth());
      removeProfile();
    },
    onError: () => {
      dispatch(setModalContent({ header: "Message", message: "Failed, try again!" }));
      dispatch(setModalDisplay(true));
    },
  });
  return logout;
};

export default useLogout;
