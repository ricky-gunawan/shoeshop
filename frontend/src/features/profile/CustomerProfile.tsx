import { useUpdateCustomerProfileApi } from "@/entities/user/api";
import useGetUserProfile from "@/entities/user/hooks/useGetUserProfile";
import ErrorMessage from "@/shared/components/ErrorMessage";
import Loader from "@/shared/components/Loader";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import { setModalContent, setModalDisplay } from "@/shared/models/modalSlice";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const CustomerProfile = () => {
  const dispatch = useAppDispatch();
  const updateCustomerProfileApi = useUpdateCustomerProfileApi();
  const { userProfile, refetchProfile } = useGetUserProfile();

  const [userInfo, setUserInfo] = useState({ name: "", email: "", address: "" });
  const [save, setSave] = useState(false);

  const handleUserInfoForm = (e: ChangeEvent<HTMLInputElement>) => {
    setSave(true);
    const elemName = e.target.name;
    const value = e.target.value;
    setUserInfo((prev) => ({ ...prev, [elemName]: value }));
  };

  const mutation = useMutation({
    mutationFn: updateCustomerProfileApi,
    onSuccess: () => {
      dispatch(setModalContent({ header: "message", message: "Successfully updating profile" }));
      dispatch(setModalDisplay(true));
      refetchProfile();
      setSave(false);
    },
  });

  const handleUpdateUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(userInfo);
  };

  useEffect(() => {
    setUserInfo({
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      address: userProfile?.address || "",
    });
  }, [userProfile]);

  return (
    <form onSubmit={handleUpdateUser} className="mx-auto max-w-2xl">
      <div>
        <label className="ml-1 block">name</label>
        <input
          value={userInfo.name}
          onChange={handleUserInfoForm}
          required
          type="text"
          name="name"
          id="admin_user_name"
          className="mb-4 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200"
        />
      </div>
      <div>
        <label className="ml-1 block">email</label>
        <input
          value={userInfo.email}
          onChange={handleUserInfoForm}
          required
          type="email"
          name="email"
          id="admin_user_email"
          className="mb-4 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200"
        />
      </div>
      <div>
        <label className="ml-1 block">address</label>
        <input
          value={userInfo.address}
          onChange={handleUserInfoForm}
          required
          type="text"
          name="address"
          id="admin_user_address"
          className="mb-4 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200"
        />
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

export default CustomerProfile;
