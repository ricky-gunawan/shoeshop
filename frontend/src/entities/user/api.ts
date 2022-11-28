import useAxiosPrivate from "@/shared/hooks/useAxiosPrivate";

// customer & admin
export const useGetMeApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async () => {
    const resp = await axiosPrivate.get<UserProfile>(`/api/get-me`);
    return resp.data;
  };
};

// customer
export const useUpdateCustomerProfileApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async (userData: UserUpdateData) => {
    const resp = await axiosPrivate.put(`/cust-api/users`, { ...userData });
    return resp.data;
  };
};

// admin
export const useUpdateAdminProfileApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async (userData: UserUpdateData) => {
    const resp = await axiosPrivate.put(`/adm-api/users`, { ...userData });
    return resp.data;
  };
};

export const useGetAdminUsersApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async () => {
    const resp = await axiosPrivate.get<UserInfo[]>(`/adm-api/users`);
    return resp.data;
  };
};
export const useGetAdminUserApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async (userId: string) => {
    const resp = await axiosPrivate.get<UserInfo>(`/adm-api/users/${userId}`);
    return resp.data;
  };
};
export const useUpdateAdminUserApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async ({ userId, userData }: { userId: string; userData: UserUpdateData }) => {
    const resp = await axiosPrivate.put(`/adm-api/users/${userId}`, { ...userData });
    return resp.data;
  };
};
export const useDeleteAdminUserApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async (userId: string) => {
    const resp = await axiosPrivate.delete(`/adm-api/users/${userId}`);
    return resp.data;
  };
};
