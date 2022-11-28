import { useDeleteAdminProductApi, useGetAdminProductsApi } from "@/entities/product/api";
import DataCard from "@/shared/components/DataCard";
import LoadingAndErrorHandler from "@/shared/components/LoadingAndErrorHandler";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import { setModalContent, setModalDisplay } from "@/shared/models/modalSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const AdminProductList = () => {
  const dispatch = useAppDispatch();
  const getAdminProductsApi = useGetAdminProductsApi();
  const { data: adminProducts, isLoading, isError, isPaused, refetch } = useQuery({ queryKey: ["adminProducts"], queryFn: getAdminProductsApi });

  const deleteAdminProductApi = useDeleteAdminProductApi();
  const mutation = useMutation({
    mutationFn: deleteAdminProductApi,
    onSuccess: () => {
      dispatch(setModalContent({ header: "message", message: "Successfully deleting product" }));
      dispatch(setModalDisplay(true));
      refetch();
    },
  });
  const handleDelete = (_id: string) => {
    mutation.mutate(_id);
  };

  if (isLoading || isError || isPaused) {
    return <LoadingAndErrorHandler isLoading={isLoading} isError={isError} isPaused={isPaused} />;
  }
  return (
    <>
      {Array.isArray(adminProducts) && adminProducts.length ? (
        <div className="grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {adminProducts.map((item) => (
            <Link to={`/admin/products/${item._id}`} key={item._id}>
              <DataCard title1="Product ID" title2="Name" field1={item._id} field2={item.name} handleDelete={() => handleDelete(item._id)} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-48 text-center">Products is Empty</div>
      )}
    </>
  );
};

export default AdminProductList;
