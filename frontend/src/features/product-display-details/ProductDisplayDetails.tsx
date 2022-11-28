import { useGetSingleProductDisplayApi } from "@/entities/product/api";
import Product from "@/entities/product/components/Product";
import LoadingAndErrorHandler from "@/shared/components/LoadingAndErrorHandler";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ProductDisplayDetails = () => {
  const params = useParams<{ productDisplayId: string }>();
  const productDisplayId = params.productDisplayId || "";
  const getSingleProductDisplayApi = useGetSingleProductDisplayApi();
  const { data, isLoading, isError, isPaused } = useQuery({ queryKey: ["singleProductDisplay", productDisplayId], queryFn: () => getSingleProductDisplayApi(productDisplayId) });

  if (isLoading || isError || isPaused) {
    return <LoadingAndErrorHandler isLoading={isLoading} isError={isError} isPaused={isPaused} />;
  }
  return (
    <>
      <Product product={data} />
    </>
  );
};

export default ProductDisplayDetails;
