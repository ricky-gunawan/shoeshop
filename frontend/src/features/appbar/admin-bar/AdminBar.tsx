import useGetUserProfile from "@/entities/user/hooks/useGetUserProfile";
import AdminNav from "@/features/appbar/admin-bar/AdminNav";
import useAppSelector from "@/shared/hooks/useAppSelector";
import useLogoutDialog from "@/shared/hooks/useLogoutDialog";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const AdminBar = () => {
  const { userProfile } = useGetUserProfile();
  const handleLogoutDialog = useLogoutDialog();

  return (
    <div className="flex h-16 w-full items-center bg-green-700 px-2 text-neutral-50 shadow-lg md:px-6">
      <Link to="/" title="Home" className="flex items-center">
        <img className="hidden xs:block" src="/shoeshop.svg" width={36} alt="logo" />
        <div className="ml-2 text-xl font-extrabold">Shoeshop Admin</div>
      </Link>
      <div className="grow"></div>
      <AdminNav />
      <div className="group ml-2 flex h-10 w-fit cursor-pointer items-center justify-center overflow-clip bg-green-700 text-center">
        <UserCircleIcon className="mb-1 h-10 w-10 bg-green-700" />
        <div className="ml-1 hidden text-xl capitalize text-white md:block">{userProfile?.name?.split(" ")[0]}</div>
        <div className="absolute top-3/4 right-2 m-1 hidden cursor-pointer rounded-md border bg-neutral-50 p-2 text-black group-hover:block md:right-4">
          <Link to="/admin/profile">
            <div className="rounded-md py-1 px-2 hover:bg-slate-200">Profile</div>
          </Link>
          <div onClick={handleLogoutDialog}>
            <div className="cursor-pointer rounded-md py-1 px-2 hover:bg-slate-200">Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBar;
