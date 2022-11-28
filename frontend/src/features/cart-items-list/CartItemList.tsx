import CartItem from "@/entities/cart/components/CartItem";
import useUpdateCart from "@/entities/cart/hooks/useUpdateCart";
import Loader from "@/shared/components/Loader";

const CartItemList = () => {
  const { isLoading, isPaused, customerCart, handleIncreaseItemQty, handleDecreaseItemQty, handleDeleteItem } = useUpdateCart();

  return (
    <div className="max-w-lg md:w-1/2">
      {Array.isArray(customerCart) && customerCart.length ? (
        <>
          {customerCart.map(({ product, name, img, price, brand, color, quantity }) => (
            <CartItem
              key={product}
              product={product}
              name={name}
              img={img}
              price={price}
              brand={brand}
              color={color}
              quantity={quantity}
              handleIncreaseItemQty={handleIncreaseItemQty}
              handleDecreaseItemQty={handleDecreaseItemQty}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </>
      ) : isLoading && !isPaused ? (
        <div className="mt-48">
          <Loader />
        </div>
      ) : (
        <div className="mt-48 text-center">Cart is empty</div>
      )}
    </div>
  );
};

export default CartItemList;
