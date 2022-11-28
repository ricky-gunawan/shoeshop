import { useDeleteAdminOrderApi, useGetAdminOrdersApi } from "@/entities/order/api";
import DataCard from "@/shared/components/DataCard";
import LoadingAndErrorHandler from "@/shared/components/LoadingAndErrorHandler";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import { setModalContent, setModalDisplay } from "@/shared/models/modalSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AdminOrdersList = () => {
  const dispatch = useAppDispatch();
  const getAdminOrdersApi = useGetAdminOrdersApi();
  const { data: adminOrders, isLoading, isError, isPaused, refetch } = useQuery({ queryKey: ["adminOrders"], queryFn: getAdminOrdersApi });

  const deleteAdminOrderApi = useDeleteAdminOrderApi();
  const mutation = useMutation({
    mutationFn: deleteAdminOrderApi,
    onSuccess: () => {
      dispatch(setModalContent({ header: "message", message: "Successfully deleting order" }));
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
      {Array.isArray(adminOrders) && adminOrders.length ? (
        <div className="grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {adminOrders.map((item) => (
            <Link to={`/admin/orders/${item._id}`} key={item._id}>
              <DataCard title1="Date" title2="User ID" field1={item.date} field2={item.user} handleDelete={() => handleDelete(item._id)} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-48 text-center">Orders is Empty</div>
      )}
    </>
  );
};

export default AdminOrdersList;
