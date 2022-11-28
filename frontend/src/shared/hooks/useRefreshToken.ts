import { setAuth } from "@/features/auth/models/authSlice";
import { useRefreshTokenApi } from "@/shared/api/auth";
import useAppDispatch from "@/shared/hooks/useAppDispatch";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const refreshTokenApi = useRefreshTokenApi();
  const refresh = async () => {
    const userCred = await refreshTokenApi();
    dispatch(setAuth(userCred));
    return userCred;
  };
  return refresh;
};

export default useRefreshToken;
