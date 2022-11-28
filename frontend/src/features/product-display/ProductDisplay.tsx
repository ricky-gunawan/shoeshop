import { useGetProductsDisplayApi } from "@/entities/product/api";
import ProductDisplayCard from "@/entities/product/components/ProductDisplayCard";
import LoadingAndErrorHandler from "@/shared/components/LoadingAndErrorHandler";
import NothingToDisplay from "@/shared/components/NothingToDisplay";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ProductDisplay = () => {
  const getProductDisplayApi = useGetProductsDisplayApi();
  const { data: products, isLoading, isError, isPaused } = useQuery({ queryKey: ["productsDisplay"], queryFn: getProductDisplayApi, staleTime: 5 * 60 * 1000 });

  if (isLoading || isError || isPaused) {
    return <LoadingAndErrorHandler isLoading={isLoading} isError={isError} isPaused={isPaused} />;
  }

  return (
    <>
      {Array.isArray(products) && products.length ? (
        <>
          <div className="mx-4 grid grid-cols-3 gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-5">
            {products?.map((product) => (
              <ProductDisplayCard key={product._id} product={product} />
            ))}
          </div>
          <Link to="/products">
            <button className="mx-auto my-8 block w-fit rounded-md bg-amber-500 py-1 px-2 text-xl font-bold uppercase text-white hover:bg-amber-600">Shopping</button>
          </Link>
        </>
      ) : (
        <div className="mt-48">
          <NothingToDisplay />
        </div>
      )}
    </>
  );
};

export default ProductDisplay;
