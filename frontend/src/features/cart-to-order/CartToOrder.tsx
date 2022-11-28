import useCreateOrder from "@/entities/cart/hooks/useCreateOrder";

const CartToOrder = () => {
  const { payment, address, totalItems, totalPriceString, customerCart, handleSelectPayment, handleCrateOrder } = useCreateOrder();

  return (
    <div className="h-fit max-h-full w-full rounded-lg bg-neutral-50 p-1 shadow-md">
      <div>
        <div className="mx-auto w-fit border-b-4 text-lg font-semibold">Order Details</div>
        <table className="">
          <tbody>
            <tr className="">
              <td className="p-2 align-top">Items</td>
              <td className="w-4 p-2 align-top">:</td>
              <td className="flex max-h-[30vh] flex-wrap gap-2 overflow-auto p-2 align-top">
                {customerCart.map((product) => (
                  <div key={product.product} className="flex w-fit justify-center gap-2 border p-1">
                    <div className="mt-1 grow sm:ml-2">
                      <h2 className="text-xs font-bold uppercase">{product.name}</h2>
                      <h2 className="my-1 text-xs underline">Rp. {product.price}</h2>
                      <h3 className="text-xs">Quantity: {product.quantity}</h3>
                    </div>
                  </div>
                ))}
              </td>
            </tr>
            <tr className="">
              <td className="p-2 align-top">Total Items</td>
              <td className="p-2 align-top">:</td>
              <td className="p-2 align-top">Rp. {totalItems}</td>
            </tr>
            <tr className="">
              <td className="p-2 align-top">Total Price</td>
              <td className="p-2 align-top">:</td>
              <td className="p-2 align-top">Rp. {totalPriceString}</td>
            </tr>
            <tr className="">
              <td className="p-2 align-top">Address</td>
              <td className="p-2 align-top">:</td>
              <td className="p-2 align-top">{address}</td>
            </tr>
            <tr className="">
              <td className="p-2">Payment</td>
              <td className="p-2">:</td>
              <td className="p-2">
                <select onChange={handleSelectPayment} value={payment} name="payment" id="payment" className="rounded-sm py-1">
                  <option value="paypal">Paypal</option>
                  <option value="stripe">Stripe</option>
                  <option value="bitcoin">Bitcoin</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <button disabled={totalItems == 0} onClick={handleCrateOrder} className="m-2 rounded-lg bg-green-700 p-2 text-sm font-semibold uppercase text-white hover:bg-green-800 disabled:bg-slate-300 disabled:hover:bg-slate-300">
            place an order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartToOrder;
