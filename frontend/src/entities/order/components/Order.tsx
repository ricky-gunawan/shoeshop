import ShoeColor from "@/shared/components/ShoeColor";
import baseURL from "@/shared/config/baseURL";

type orderProps = {
  date: string;
  items: {
    product: string;
    name: string;
    img: string;
    price: string;
    brand: string;
    color: string;
    quantity: number;
  }[];
  totalItems: number;
  totalPrice: string;
  address: string;
  payment: string;
  isPaid: boolean;
  handlePaymentModal: () => void;
};

const Order = ({ date, items, totalItems, totalPrice, address, payment, isPaid, handlePaymentModal }: orderProps) => {
  return (
    <div className="my-4 w-full self-start rounded-lg border-2 p-1">
      <div className="mx-auto w-fit border-b-2 text-lg font-semibold">Order Details {`(${date})`}</div>
      <div className="p-2">Items :</div>
      <div className="flex flex-wrap gap-2 p-2 align-top">
        {items.map((item) => (
          <div key={item.product} className="flex w-fit flex-col justify-center gap-2 border p-1 xs:flex-row">
            <div className="grow-0 overflow-hidden">
              <img className="my-1 rounded-lg md:ml-4" width={100} src={item.img} alt={item.name} />
            </div>
            <div className="mt-1 grow md:ml-2">
              <h2 className="max-w-[100px] text-base font-semibold uppercase xs:max-w-[250px]">{item.name}</h2>
              <h3 className="text-xs">
                Brand: <span className="uppercase">{item.brand}</span>
              </h3>
              <h3 className="text-xs">
                Color: <ShoeColor color={item.color} />
              </h3>
              <h2 className="text-md my-1 underline">Rp. {item.price}</h2>
              <h3 className="text-sm">Quantity: {item.quantity}</h3>
            </div>
          </div>
        ))}
      </div>
      <table className="">
        <tbody>
          <tr className="">
            <td className="p-2 align-top">Total Items</td>
            <td className="p-2 align-top">:</td>
            <td className="p-2 align-top">Rp. {totalItems}</td>
          </tr>
          <tr className="">
            <td className="p-2 align-top">Total Price</td>
            <td className="p-2 align-top">:</td>
            <td className="p-2 align-top">Rp. {totalPrice}</td>
          </tr>
          <tr className="">
            <td className="p-2 align-top">Address</td>
            <td className="p-2 align-top">:</td>
            <td className="p-2 align-top">{address}</td>
          </tr>
          <tr className="">
            <td className="p-2">Payment</td>
            <td className="p-2">:</td>
            <td className="p-2">{payment}</td>
          </tr>
          <tr className="">
            <td className="p-2">Payment Status</td>
            <td className="p-2">:</td>
            <td className="p-2">{isPaid ? "Paid" : "Not Paid Yet"}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end">
        {isPaid ? (
          ""
        ) : (
          <div>
            <button onClick={handlePaymentModal} className="m-2 rounded-lg bg-green-700 p-2 text-sm font-semibold uppercase text-white hover:bg-green-800">
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
