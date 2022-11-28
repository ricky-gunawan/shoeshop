import { useGetAdminUserApi, useUpdateAdminUserApi } from "@/entities/user/api";
import ErrorMessage from "@/shared/components/ErrorMessage";
import Loader from "@/shared/components/Loader";
import LoadingAndErrorHandler from "@/shared/components/LoadingAndErrorHandler";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import { setModalContent, setModalDisplay } from "@/shared/models/modalSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminEditUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getAdminUserApi = useGetAdminUserApi();
  const updateAdminUserApi = useUpdateAdminUserApi();
  const params = useParams<{ userId: string }>();
  const userId = params.userId || "";

  const [userInfo, setUserInfo] = useState({ _id: "", name: "", email: "", address: "", roles: [NaN] });
  const [save, setSave] = useState(false);

  const { refetch, isLoading, isError, isPaused } = useQuery({
    queryKey: ["adminUser", userId],
    queryFn: () => getAdminUserApi(userId),
    enabled: false,
    onSuccess: (data) => {
      setUserInfo(data);
    },
  });

  const handleUserInfoForm = (e: ChangeEvent<HTMLInputElement>) => {
    setSave(true);
    const elemName = e.target.name;
    const value = e.target.type === "radio" ? [parseInt(e.target.value)] : e.target.value;
    setUserInfo((prev) => ({ ...prev, [elemName]: value }));
  };

  const mutation = useMutation({
    mutationFn: updateAdminUserApi,
    onSuccess: () => {
      dispatch(setModalContent({ header: "message", message: "Successfully editing user" }));
      dispatch(setModalDisplay(true));
      navigate("/admin/users");
    },
  });

  const handleUpdateUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ userId, userData: userInfo });
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading || isError || isPaused) {
    return <LoadingAndErrorHandler isLoading={isLoading} isError={isError} isPaused={isPaused} />;
  }
  return (
    <form onSubmit={handleUpdateUser} className="mx-auto max-w-2xl">
      <div>
        <label className="ml-1 block">name</label>
        <input value={userInfo.name} disabled required type="text" name="name" id="admin_user_name" className="mb-4 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200" />
      </div>
      <div>
        <label className="ml-1 block">email</label>
        <input value={userInfo.email} disabled required type="email" name="email" id="admin_user_email" className="mb-4 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200" />
      </div>
      <div>
        <label className="ml-1 block">address</label>
        <input value={userInfo.address} disabled required type="text" name="address" id="admin_user_address" className="mb-4 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200" />
      </div>
      <div className="mb-4">
        <div className="ml-1">roles</div>
        <div className="cursor-pointer">
          <input value={11} checked={userInfo.roles?.includes(11)} onChange={handleUserInfoForm} type="radio" name="roles" id="admin_user_role_1" className="rounded-lg text-green-700 focus:ring-green-700" />
          <span className="ml-2">Customer</span>
        </div>
        <div className="cursor-pointer">
          <input value={21} checked={userInfo.roles?.includes(21)} onChange={handleUserInfoForm} type="radio" name="roles" id="admin_user_role_2" className="rounded-lg text-green-700 focus:ring-green-700" />
          <span className="ml-2">Admin</span>
        </div>
      </div>
      {mutation.isError || mutation.isPaused ? (
        <div className="mx-auto -mt-2 mb-4 w-fit text-sm text-red-500">
          <ErrorMessage />
        </div>
      ) : (
        ""
      )}
      {mutation.isLoading ? (
        <div className="mx-auto -mt-2 mb-4 w-full text-sm text-red-500">
          <Loader />
        </div>
      ) : (
        ""
      )}
      <input
        type="submit"
        value="save"
        disabled={!save}
        className={`mx-auto mt-8 block w-40 cursor-pointer rounded-md ${save ? `bg-green-500 hover:bg-green-600` : `bg-slate-300`} py-1 text-center font-semibold uppercase text-neutral-50`}
      />
    </form>
  );
};

export default AdminEditUser;
