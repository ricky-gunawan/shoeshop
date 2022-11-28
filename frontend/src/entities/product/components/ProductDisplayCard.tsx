import baseURL from "@/shared/config/baseURL";
import { Link } from "react-router-dom";

type ProductDisplayCardProps = {
  product: Product;
};

const ProductDisplayCard = ({ product }: ProductDisplayCardProps) => {
  return (
    <Link to={`/products-display/${product._id}`}>
      <div className="rounded-lg bg-gradient-to-r from-green-700 via-amber-500 to-yellow-400 p-1">
        <div className="aspect-square w-full overflow-hidden">
          <img className="" src={product.img} alt={product.name} />
        </div>
      </div>
    </Link>
  );
};

export default ProductDisplayCard;
