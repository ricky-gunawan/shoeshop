import useUpdateCart from "@/entities/cart/hooks/useUpdateCart";
import { useGetCustomerProductsApi } from "@/entities/product/api";
import Product from "@/entities/product/components/Product";
import LoadingAndErrorHandler from "@/shared/components/LoadingAndErrorHandler";
import { useQuery } from "@tanstack/react-query";
import { MouseEvent } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const getProductsApi = useGetCustomerProductsApi();
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, isError, isPaused } = useQuery({ queryKey: ["customerProducts"], queryFn: getProductsApi, select: (data) => data.filter((product) => product._id === productId) });

  const { handleAddProductToCart } = useUpdateCart();

  if (isLoading || isError || isPaused) {
    return <LoadingAndErrorHandler isLoading={isLoading} isError={isError} isPaused={isPaused} />;
  }
  return (
    <>
      <Product isButton={true} product={data[0]} handleAddProductToCart={handleAddProductToCart} />
    </>
  );
};

export default ProductDetails;
