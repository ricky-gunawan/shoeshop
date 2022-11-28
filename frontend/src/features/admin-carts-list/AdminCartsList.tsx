import { useDeleteAdminCartApi, useGetAdminCartsApi } from "@/entities/cart/api";
import DataCard from "@/shared/components/DataCard";
import LoadingAndErrorHandler from "@/shared/components/LoadingAndErrorHandler";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import { setModalContent, setModalDisplay } from "@/shared/models/modalSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AdminCartsList = () => {
  const getAdminCartsApi = useGetAdminCartsApi();
  const dispatch = useAppDispatch();
  const { data: adminCarts, isLoading, isError, isPaused, refetch } = useQuery({ queryKey: ["adminCarts"], queryFn: getAdminCartsApi });

  const deleteAdminCartApi = useDeleteAdminCartApi();
  const mutation = useMutation({
    mutationFn: deleteAdminCartApi,
    onSuccess: () => {
      dispatch(setModalContent({ header: "message", message: "Successfully deleting cart" }));
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
      {Array.isArray(adminCarts) && adminCarts.length ? (
        <div className="grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {adminCarts.map((item) => (
            <Link to={`/admin/carts/${item._id}`} key={item._id}>
              <DataCard title1="Cart ID" title2="Total Items" field1={item.user} field2={item.items.length.toString()} handleDelete={() => handleDelete(item._id)} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-48 text-center">Orders is Empty</div>
      )}
    </>
  );
};

export default AdminCartsList;
