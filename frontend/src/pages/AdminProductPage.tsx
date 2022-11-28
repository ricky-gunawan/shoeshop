import AdminProductList from "@/features/admin-products-list";
import { Link } from "react-router-dom";

const AdminProductPage = () => {
  return (
    <>
      <div className="mr-4 flex justify-end">
        <Link to="/admin/products/add-product">
          <button className="rounded-md bg-green-700 px-2 py-1 font-semibold uppercase text-neutral-50 hover:bg-green-800">add product</button>
        </Link>
      </div>
      <AdminProductList />
    </>
  );
};

export default AdminProductPage;
