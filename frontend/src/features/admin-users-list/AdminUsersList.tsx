import { useDeleteAdminUserApi, useGetAdminUsersApi } from "@/entities/user/api";
import DataCard from "@/shared/components/DataCard";
import LoadingAndErrorHandler from "@/shared/components/LoadingAndErrorHandler";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import { setModalContent, setModalDisplay } from "@/shared/models/modalSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AdminUsersList = () => {
  const getAdminUsersApi = useGetAdminUsersApi();
  const dispatch = useAppDispatch();
  const { data: adminUsers, isLoading, isError, isPaused, refetch } = useQuery({ queryKey: ["adminUsers"], queryFn: getAdminUsersApi });

  const deleteAdminUserApi = useDeleteAdminUserApi();
  const mutation = useMutation({
    mutationFn: deleteAdminUserApi,
    onSuccess: () => {
      dispatch(setModalContent({ header: "message", message: "Successfully deleting user" }));
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
      {Array.isArray(adminUsers) && adminUsers.length ? (
        <div className="grid gap-2 p-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {adminUsers.map((item) => (
            <Link to={`/admin/users/${item._id}`} key={item._id}>
              <DataCard title1="User ID" title2="Name" field1={item._id} field2={item.name} handleDelete={() => handleDelete(item._id)} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-48 text-center">Users is Empty</div>
      )}
    </>
  );
};

export default AdminUsersList;
