import { useGetAdminCartsApi } from "@/entities/cart/api";
import LoadingAndErrorHandler from "@/shared/components/LoadingAndErrorHandler";
import ShoeColor from "@/shared/components/ShoeColor";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const AdminEditCart = () => {
  const getAdminCartsApi = useGetAdminCartsApi();
  const { cartId } = useParams<{ cartId: string }>();
  const {
    data: adminCart,
    isLoading,
    isError,
    isPaused,
  } = useQuery({
    queryKey: ["adminCarts"],
    queryFn: getAdminCartsApi,
    select: (data) => data.filter((cart) => cart._id === cartId)[0],
  });

  if (isLoading || isError || isPaused) {
    return <LoadingAndErrorHandler isLoading={isLoading} isError={isError} isPaused={isPaused} />;
  }

  return (
    <form className="mx-auto max-w-2xl">
      <div>
        <label className="ml-1 block">id</label>
        <input value={adminCart?._id} disabled type="text" name="id" id="admin_cart_id" className="my-2 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200" />
      </div>
      <div>
        <label className="ml-1 block">user</label>
        <input value={adminCart?.user} disabled type="text" name="user" id="admin_cart_user" className="my-2 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200" />
      </div>
      <div>
        <label className="ml-1 block">items</label>
        <div className="flex max-h-[30vh] flex-wrap gap-2 overflow-auto p-2 align-top">
          {adminCart?.items?.map((product) => (
            <div key={product.product} className="flex w-fit justify-center gap-2 border p-1">
              <div className="mt-1 grow sm:ml-2">
                <h2 className="text-xs font-bold uppercase">{product.name}</h2>
                <h3 className="text-xs">
                  Brand: <span className="uppercase">{product.brand}</span>
                </h3>
                <h3 className="text-xs">
                  Color: <ShoeColor color={product.color} />
                </h3>
                <h2 className="my-1 text-xs underline">Rp. {product.price}</h2>
                <h3 className="text-xs">Quantity: {product.quantity}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default AdminEditCart;
