import ProductFilter from "@/features/product-filter";
import ProductList from "@/features/product-list";
import Drawer from "@/shared/components/Drawer";

const ProductListPage = () => {
  return (
    <>
      <Drawer>
        <ProductFilter />
      </Drawer>
      <ProductList />
    </>
  );
};

export default ProductListPage;
