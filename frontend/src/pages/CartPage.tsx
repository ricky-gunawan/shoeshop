import CartItemList from "@/features/cart-items-list";
import CartToOrder from "@/features/cart-to-order";
import BackButton from "@/shared/components/BackButton";

const CartPage = () => {
  return (
    <>
      <BackButton />
      <div className="flex flex-col gap-2 md:flex-row md:gap-4">
        <CartItemList />
        <div className="left-1/2 mx-auto max-w-screen-sm md:fixed md:mx-4 md:max-h-[80vh]">
          <CartToOrder />
        </div>
      </div>
    </>
  );
};

export default CartPage;
