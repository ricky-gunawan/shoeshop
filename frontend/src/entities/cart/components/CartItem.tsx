import ShoeColor from "@/shared/components/ShoeColor";
import baseURL from "@/shared/config/baseURL";
import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

type CartItemProps = {
  product: string;
  img: string;
  name: string;
  price: string;
  brand: string;
  color: string;
  quantity: number;
  handleIncreaseItemQty: (productId: string) => void;
  handleDecreaseItemQty: (productId: string) => void;
  handleDeleteItem: (productId: string) => void;
};

const CartItem = ({ product, img, name, price, brand, color, quantity, handleIncreaseItemQty, handleDecreaseItemQty, handleDeleteItem }: CartItemProps) => {
  return (
    <div className="mb-2 flex flex-col border-b border-gray-600 p-1">
      <div className="flex items-center justify-center gap-2">
        <div className="grow-1 overflow-hidden">
          <img className="my-1 rounded-lg sm:ml-4" width={100} src={img} alt={name} />
        </div>
        <div className="grow sm:ml-2">
          <h2 className="min-w-[180px] text-xs font-bold uppercase line-clamp-2 xs:text-base">{name}</h2>
          <h3 className="text-xs">
            Brand: <span className="uppercase">{brand}</span>
          </h3>
          <h3 className="text-xs">
            Color: <ShoeColor color={color} />
          </h3>
          <h2 className="text-md my-1 underline">Rp. {price}</h2>
        </div>
        <div onClick={() => handleDeleteItem(product)} className="cursor-pointer">
          <TrashIcon className="h-6 w-6 text-red-600" />
        </div>
      </div>
      <div className="mt-1 flex justify-around text-sm">
        <span className="">Quantity: </span>
        <div className="flex">
          <MinusCircleIcon onClick={() => handleDecreaseItemQty(product)} width={20} className="mx-2 cursor-pointer" />
          <span>{quantity}</span>
          <PlusCircleIcon onClick={() => handleIncreaseItemQty(product)} width={20} className="mx-2 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
