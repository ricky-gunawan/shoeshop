import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const AdminNav = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[2];

  return (
    <>
      <div className="hidden md:flex">
        <Link to="/admin/products">
          <div className={`mr-2 cursor-pointer ${path == "products" ? "border-b-2" : ""} border-white text-xl capitalize text-white`}>products</div>
        </Link>
        <Link to="/admin/users">
          <div className={`mr-2 cursor-pointer ${path == "users" ? "border-b-2" : ""} border-white text-xl capitalize text-white`}>users</div>
        </Link>
        <Link to="/admin/orders">
          <div className={`mr-2 cursor-pointer ${path == "orders" ? "border-b-2" : ""} border-white text-xl capitalize text-white`}>orders</div>
        </Link>
        <Link to="/admin/carts">
          <div className={`mr-2 cursor-pointer ${path == "carts" ? "border-b-2" : ""} border-white text-xl capitalize text-white`}>carts</div>
        </Link>
      </div>
      <div className="group mr-2 md:hidden">
        <div className="text-xl capitalize text-white">
          <span className="capitalize">{path}</span>
          <ChevronRightIcon className="ml-1 inline h-5 w-5 group-hover:hidden" />
          <ChevronDownIcon className="ml-1 hidden h-5 w-5 group-hover:inline" />
        </div>
        <div className="absolute top-3/4 m-1 hidden cursor-pointer rounded-md border bg-neutral-50 p-2 text-black group-hover:block">
          <Link to="/admin/products">
            <div className="rounded-md py-1 px-2 hover:bg-slate-200">Products</div>
          </Link>
          <Link to="/admin/users">
            <div className="rounded-md py-1 px-2 hover:bg-slate-200">Users</div>
          </Link>
          <Link to="/admin/orders">
            <div className="rounded-md py-1 px-2 hover:bg-slate-200">Orders</div>
          </Link>
          <Link to="/admin/carts">
            <div className="rounded-md py-1 px-2 hover:bg-slate-200">carts</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
