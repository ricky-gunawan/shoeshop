import axiosPublic from "@/shared/api/axios";

// Public
export const useRegisterApi = () => {
  return async (userData: UserRegisterData) => {
    const resp = await axiosPublic.post(`/api/auth/register`, { ...userData });
    return resp.data;
  };
};
export const useLoginApi = () => {
  return async (userData: UserLoginData) => {
    const resp = await axiosPublic.post<UserCred>(`/api/auth/login`, { ...userData }, { withCredentials: true });
    return resp.data;
  };
};
export const useRefreshTokenApi = () => {
  return async () => {
    const resp = await axiosPublic.get<UserCred>(`/api/auth/refresh`, { withCredentials: true });
    return resp.data;
  };
};
export const useLogoutApi = () => {
  return async () => {
    const resp = await axiosPublic.get(`/api/auth/logout`, { withCredentials: true });
    return resp.data;
  };
};
