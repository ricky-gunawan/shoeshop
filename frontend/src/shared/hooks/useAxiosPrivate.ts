import { axiosPrivate } from "@/shared/api/axios";
import useAppSelector from "@/shared/hooks/useAppSelector";
import useRefreshToken from "@/shared/hooks/useRefreshToken";
import { useEffect } from "react";

const useAxiosPrivate = () => {
  const auth = useAppSelector((store) => store.auth);
  const refresh = useRefreshToken();

  useEffect(() => {
    let data: any;
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.headers && !config.headers.authorization) {
          config.headers.authorization = `Bearer ${auth.accessToken}`;
        }
        data = config.data;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.authorization = `Bearer ${newAccessToken}`;
          prevRequest.data = data;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
