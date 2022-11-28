import { useGetCustomerOrdersApi } from "@/entities/order/api";
import Order from "@/entities/order/components/Order";
import LoadingAndErrorHandler from "@/shared/components/LoadingAndErrorHandler";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import { setModalContent, setModalDisplay } from "@/shared/models/modalSlice";
import { useQuery } from "@tanstack/react-query";

const OrderList = () => {
  const dispatch = useAppDispatch();
  const getCustomerOrdersApi = useGetCustomerOrdersApi();
  const { data: customerOrders, isLoading, isError, isPaused } = useQuery({ queryKey: ["customerOrders"], queryFn: getCustomerOrdersApi });

  const handlePaymentModal = () => {
    dispatch(setModalContent({ header: "System", message: "The payment system is not yet ready." }));
    dispatch(setModalDisplay(true));
  };

  if (isLoading || isError || isPaused) {
    return <LoadingAndErrorHandler isLoading={isLoading} isError={isError} isPaused={isPaused} />;
  }

  return (
    <>
      {Array.isArray(customerOrders) && customerOrders.length ? (
        <>
          {customerOrders.map((order) => (
            <Order
              key={order._id}
              date={order.date}
              items={order.items}
              totalItems={order.totalItems}
              totalPrice={order.totalPrice}
              address={order.address}
              payment={order.payment}
              isPaid={order.isPaid}
              handlePaymentModal={handlePaymentModal}
            />
          ))}
        </>
      ) : (
        <div className="mt-48 text-center">You are not ordering anything</div>
      )}
    </>
  );
};

export default OrderList;
