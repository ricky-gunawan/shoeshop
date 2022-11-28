import { useGetMeApi } from "@/entities/user/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useGetUserProfile = () => {
  const getMeApi = useGetMeApi();
  const { data: userProfile, refetch: refetchProfile, remove: removeProfile } = useQuery({ queryKey: ["getMe"], queryFn: getMeApi, enabled: false, cacheTime: Infinity });

  useEffect(() => {
    refetchProfile();
  }, []);
  return { refetchProfile, removeProfile, userProfile };
};

export default useGetUserProfile;
