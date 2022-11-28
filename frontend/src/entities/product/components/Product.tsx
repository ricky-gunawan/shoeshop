import useUpdateCart from "@/entities/cart/hooks/useUpdateCart";
import ShoeColor from "@/shared/components/ShoeColor";
import baseURL from "@/shared/config/baseURL";
import { MouseEvent } from "react";

type ProductProps = {
  product: Product;
  isButton?: boolean;
  handleAddProductToCart?: (product: Product) => void;
};

const Product = ({ product, isButton = false, handleAddProductToCart }: ProductProps) => {
  return (
    <div className="flex max-w-screen-lg flex-col gap-4 sm:flex-row lg:mx-auto">
      <div className="w-full overflow-hidden sm:w-1/2">
        <img className="mx-auto rounded-lg" width={352} src={product.img} alt={product.name} />
      </div>
      <div className="flex w-full flex-col gap-3 p-4 sm:w-1/2">
        <h2 className="grow-0 text-xl font-bold uppercase">{product.name}</h2>
        <h2 className="grow-0 text-xl">Rp. {product.price}</h2>
        <h3 className="grow-0 text-sm">
          Brand: <span className="uppercase">{product.brand}</span>
        </h3>
        <h3 className="grow-0 text-sm">
          Color: <ShoeColor color={product.color} />
        </h3>
        <p className="grow text-base">{product.description}</p>
        <div className="flex grow-0 justify-end">
          {isButton && handleAddProductToCart ? (
            <button onClick={() => handleAddProductToCart(product)} className="rounded-md bg-green-700 p-2 font-semibold uppercase text-neutral-50 hover:bg-green-800">
              add to cart
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
