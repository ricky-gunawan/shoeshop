import ProductDisplay from "@/features/product-display";

const ProductDisplayPage = () => {
  return (
    <>
      <div>
        <h1 className="mx-auto mb-8 w-3/4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-center text-4xl font-extrabold text-transparent">Find Your Dream Shoe at An Affordable Price</h1>
      </div>
      <ProductDisplay />
    </>
  );
};

export default ProductDisplayPage;
