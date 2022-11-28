import useAxiosPrivate from "@/shared/hooks/useAxiosPrivate";

// customer
export const useGetCustomerOrdersApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async () => {
    const resp = await axiosPrivate.get<Order[]>(`/cust-api/orders`);
    return resp.data;
  };
};
export const useCreateCustomerOrderApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async (orderData: OrderData) => {
    const resp = await axiosPrivate.post(`/cust-api/orders`, { ...orderData });
    return resp.data;
  };
};

// admin
export const useGetAdminOrdersApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async () => {
    const resp = await axiosPrivate.get<Order[]>(`/adm-api/orders`);
    return resp.data;
  };
};
export const useGetAdminOrderApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async (orderId: string) => {
    const resp = await axiosPrivate.get<Order>(`/adm-api/orders/${orderId}`);
    return resp.data;
  };
};
export const useUpdateAdminOrderApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async ({ orderId, orderData }: { orderId: string; orderData: OrderData }) => {
    const resp = await axiosPrivate.put(`/adm-api/orders/${orderId}`, { ...orderData });
    return resp.data;
  };
};
export const useDeleteAdminOrderApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async (orderId: string) => {
    const resp = await axiosPrivate.delete(`/adm-api/orders/${orderId}`);
    return resp.data;
  };
};
