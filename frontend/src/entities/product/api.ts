import axiosPublic from "@/shared/api/axios";
import useAxiosPrivate from "@/shared/hooks/useAxiosPrivate";
import { AxiosResponse } from "axios";

// public
export const useGetProductsDisplayApi = () => {
  return async () => {
    const resp = await axiosPublic.get<Product[]>(`/api/products-display`);
    return resp.data;
  };
};

export const useGetSingleProductDisplayApi = () => {
  return async (productId: string) => {
    const resp = await axiosPublic.get<Product>(`/api/products-display/${productId}`);
    return resp.data;
  };
};

// customer
export const useGetCustomerProductsApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async () => {
    const resp = await axiosPrivate.get<Product[]>(`/cust-api/products`);
    return resp.data;
  };
};
export const useGetCustomerProductApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async (productId: string) => {
    const resp = await axiosPrivate.get<Product>(`/cust-api/products/${productId}`);
    return resp.data;
  };
};

// admin only
export const useGetAdminProductsApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async () => {
    const resp = await axiosPrivate.get<Product[]>(`/adm-api/products`);
    return resp.data;
  };
};
export const useGetAdminProductApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async (productId: string) => {
    const resp = await axiosPrivate.get<Product>(`/adm-api/products/${productId}`);
    return resp.data;
  };
};

export const useCreateAdminProductApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async (productData: ProductData) => {
    const resp = await axiosPrivate.post(`/adm-api/products`, { ...productData });
    return resp.data;
  };
};
export const useUpdateAdminProductApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async ({ productId, productData }: { productId: string; productData: ProductData }) => {
    const resp = await axiosPrivate.put(`/adm-api/products/${productId}`, { ...productData });
    return resp.data;
  };
};
export const useDeleteAdminProductApi = () => {
  const axiosPrivate = useAxiosPrivate();
  return async (productId: string) => {
    const resp = await axiosPrivate.delete(`/adm-api/products/${productId}`);
    return resp.data;
  };
};
