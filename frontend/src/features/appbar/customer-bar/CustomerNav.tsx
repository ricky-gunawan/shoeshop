import useUpdateCart from "@/entities/cart/hooks/useUpdateCart";
import { Link, useLocation } from "react-router-dom";

const CustomerNav = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const { totalItems } = useUpdateCart();

  return (
    <div className="flex xs:gap-4">
      <Link to="/orders">
        <div className={`mr-2 cursor-pointer ${path == "orders" ? "border-b-2" : ""} border-white text-xl capitalize text-white`}>Orders</div>
      </Link>
      <Link to="/cart" className="relative mr-4">
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400 px-2 text-sm text-white">{totalItems}</div>
        <div className={`cursor-pointer ${path == "cart" ? "border-b-2" : ""} border-white text-xl capitalize text-white`}>Cart</div>
      </Link>
    </div>
  );
};

export default CustomerNav;
