import useUpdateCart from "@/entities/cart/hooks/useUpdateCart";
import { useGetCustomerProductsApi } from "@/entities/product/api";
import ProductCard from "@/entities/product/components/ProductCard";
import LoadingAndErrorHandler from "@/shared/components/LoadingAndErrorHandler";
import NothingToDisplay from "@/shared/components/NothingToDisplay";
import useAppSelector from "@/shared/hooks/useAppSelector";
import { useQuery } from "@tanstack/react-query";

const ProductList = () => {
  const getProductsApi = useGetCustomerProductsApi();
  const { data, isLoading, isError, isPaused } = useQuery({ queryKey: ["customerProducts"], queryFn: getProductsApi });
  const { brand, color } = useAppSelector((store) => store.filter);

  let products;
  if (brand === "all" && color === "all") {
    products = data;
  } else if (brand === "all") {
    products = data?.filter((product) => product.color === color);
  } else if (color === "all") {
    products = data?.filter((product) => product.brand === brand);
  } else {
    products = data?.filter((product) => product.brand === brand && product.color === color);
  }

  const { handleAddProductToCart } = useUpdateCart();

  if (isLoading || isError || isPaused) {
    return <LoadingAndErrorHandler isLoading={isLoading} isError={isError} isPaused={isPaused} />;
  }

  return (
    <>
      {Array.isArray(products) && products.length ? (
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-3 lg:ml-40 lg:grid-cols-4">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} handleAddProductToCart={handleAddProductToCart} />
          ))}
        </div>
      ) : (
        <div className="mt-48">
          <NothingToDisplay />
        </div>
      )}
    </>
  );
};

export default ProductList;
