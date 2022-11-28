import { useGetAdminOrderApi, useUpdateAdminOrderApi } from "@/entities/order/api";
import ErrorMessage from "@/shared/components/ErrorMessage";
import Loader from "@/shared/components/Loader";
import LoadingAndErrorHandler from "@/shared/components/LoadingAndErrorHandler";
import ShoeColor from "@/shared/components/ShoeColor";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import { setModalContent, setModalDisplay } from "@/shared/models/modalSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminEditOrder = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getAdminOrderApi = useGetAdminOrderApi();
  const updateAdminOrderApi = useUpdateAdminOrderApi();
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId || "";
  const { refetch, isLoading, isError, isPaused } = useQuery({
    queryKey: ["adminOrder", orderId],
    queryFn: () => getAdminOrderApi(orderId),
    enabled: false,
    onSuccess: (data) => {
      setOrderData(data);
    },
  });
  const [orderData, setOrderData] = useState({
    _id: "",
    user: "",
    date: "",
    items: [
      {
        _id: "",
        product: "",
        name: "",
        img: "",
        price: "",
        brand: "",
        color: "",
        quantity: NaN,
      },
    ],
    totalItems: NaN,
    totalPrice: "",
    address: "",
    payment: "",
    isPaid: false,
  });

  const [save, setSave] = useState(false);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setOrderData((prev) => ({ ...prev, isPaid: value }));
    setSave(true);
  };

  const mutation = useMutation({
    mutationFn: updateAdminOrderApi,
    onSuccess: () => {
      dispatch(setModalContent({ header: "message", message: "Successfully editing order" }));
      dispatch(setModalDisplay(true));
      navigate("/admin/orders");
    },
  });

  const handleUpdateOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ orderId, orderData });
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading || isError || isPaused) {
    return <LoadingAndErrorHandler isLoading={isLoading} isError={isError} isPaused={isPaused} />;
  }

  return (
    <form onSubmit={handleUpdateOrder} className="mx-auto max-w-2xl">
      <div>
        <label className="ml-1 block">id</label>
        <input value={orderData._id} disabled type="text" name="id" id="admin_order_id" className="my-2 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200" />
      </div>
      <div>
        <label className="ml-1 block">user</label>
        <input value={orderData.user} disabled type="text" name="user" id="admin_order_user" className="my-2 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200" />
      </div>
      <div>
        <label className="ml-1 block">date</label>
        <input value={orderData.date} disabled type="text" name="date" id="admin_order_date" className="my-2 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200" />
      </div>
      <div>
        <label className="ml-1 block">items</label>
        <div className="flex max-h-[30vh] flex-wrap gap-2 overflow-auto p-2 align-top">
          {orderData.items?.map((product) => (
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
      <div>
        <label className="ml-1 block">total items</label>
        <input
          value={orderData.totalItems.toString()}
          disabled
          type="text"
          name="totalItems"
          id="admin_order_totalItems"
          className="my-2 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200"
        />
      </div>
      <div>
        <label className="ml-1 block">total price</label>
        <input value={orderData.totalPrice} disabled type="text" name="totalPrice" id="admin_order_totalPrice" className="my-2 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200" />
      </div>
      <div>
        <label className="ml-1 block">address</label>
        <input value={orderData.address} disabled type="text" name="address" id="admin_order_address" className="my-2 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200" />
      </div>
      <div>
        <label className="ml-1 block">payment</label>
        <input value={orderData.payment} disabled type="text" name="payment" id="admin_order_payment" className="my-2 w-full rounded-sm border border-slate-300 focus:border-green-700 focus:ring-green-700 disabled:bg-slate-200" />
      </div>
      <div className="mb-4">
        <label className="ml-1 block">payment status</label>
        <input checked={orderData.isPaid} onChange={handleFormChange} type="checkbox" name="isPaid" id="admin_order_isPaid" className="rounded-sm border border-slate-300 align-middle focus:border-green-700 focus:ring-green-700" />
        <span className="ml-2 align-middle">Set Already Paid</span>
      </div>
      {mutation.isError || mutation.isPaused ? (
        <div className="mx-auto -mt-2 mb-4 w-fit text-sm text-red-500">
          <ErrorMessage />
        </div>
      ) : (
        ""
      )}
      {mutation.isLoading ? (
        <div className="mx-auto -mt-2 mb-4 w-full text-sm text-red-500">
          <Loader />
        </div>
      ) : (
        ""
      )}
      <input
        type="submit"
        value="save"
        disabled={!save}
        className={`mx-auto mt-8 block w-40 cursor-pointer rounded-md ${save ? `bg-green-500 hover:bg-green-600` : `bg-slate-300`} py-1 text-center font-semibold uppercase text-neutral-50`}
      />
    </form>
  );
};

export default AdminEditOrder;
