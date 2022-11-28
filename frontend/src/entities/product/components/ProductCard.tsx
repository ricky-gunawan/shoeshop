import baseURL from "@/shared/config/baseURL";
import { MouseEvent } from "react";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
  handleAddProductToCart: (product: Product) => void;
};

const ProductCard = ({ product, handleAddProductToCart }: ProductCardProps) => {
  const handleAddButton = (e: MouseEvent) => {
    e.preventDefault();
    handleAddProductToCart(product);
  };

  return (
    <Link to={`/products/${product._id}`}>
      <div className="max-w-[350px] overflow-hidden rounded-lg bg-neutral-50 shadow-md">
        <div className="aspect-square w-full overflow-hidden">
          <img className="mx-auto" src={product.img} alt={product.name} />
        </div>
        <div className="m-3 h-[3.5rem] align-bottom text-lg font-bold uppercase line-clamp-2">{product.name}</div>
        <div className="m-3 text-lg">Rp. {product.price}</div>
        <div className="m-3 flex justify-end">
          <button onClick={handleAddButton} className="rounded-md bg-green-700 p-2 font-semibold uppercase text-neutral-50 hover:bg-green-800">
            add to cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
