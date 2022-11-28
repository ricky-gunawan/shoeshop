import { useUpdateCustomerCartApi } from "@/entities/cart/api";
import useCalculateCartItems from "@/entities/cart/hooks/useCalculateCartItems";
import { useCreateCustomerOrderApi } from "@/entities/order/api";
import useGetUserProfile from "@/entities/user/hooks/useGetUserProfile";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import useAppSelector from "@/shared/hooks/useAppSelector";
import { setModalContent, setModalDisplay, setModalFeedback, setModalNeedFeedback } from "@/shared/models/modalSlice";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useCreateOrder = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const updateCustomerCartApi = useUpdateCustomerCartApi();
  const createCustomerOrderApi = useCreateCustomerOrderApi();
  const { feedback } = useAppSelector((store) => store.modal);
  const customerCart = useAppSelector((store) => store.customerCart);
  const { userProfile } = useGetUserProfile();
  const { totalItems, totalPriceString } = useCalculateCartItems(customerCart);
  const [payment, setPayment] = useState("paypal");
  const [createOrderDialog, setCreateOrderDialog] = useState(false);

  const handleSelectPayment = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setPayment(e.target.value);
  };

  const updatedCartItems: CartItemData[] = customerCart.map((cartItem) => {
    return {
      product: cartItem.product,
      name: cartItem.name,
      img: cartItem.img,
      price: cartItem.price,
      brand: cartItem.brand,
      color: cartItem.color,
      quantity: cartItem.quantity,
    };
  });

  const orderData: OrderData = {
    date: new Date().toLocaleString(),
    items: updatedCartItems,
    totalItems,
    totalPrice: totalPriceString,
    address: userProfile?.address || "",
    payment,
  };

  const { mutate: mutateCart } = useMutation({
    mutationFn: updateCustomerCartApi,
  });

  const { mutate: createOrder } = useMutation({
    mutationFn: createCustomerOrderApi,
    onSuccess: (data: UserCred) => {
      dispatch(setModalContent({ header: "Message", message: "Successfully create an order" }));
      dispatch(setModalDisplay(true));
      navigate("/orders");
      mutateCart([]);
    },
    onError: () => {
      dispatch(setModalContent({ header: "Message", message: "Failed, try again!" }));
      dispatch(setModalDisplay(true));
    },
  });

  const handleCrateOrder = () => {
    dispatch(setModalContent({ header: "Place an Order?", message: `Total items: ${totalItems}, total price: ${totalPriceString}` }));
    dispatch(setModalNeedFeedback(true));
    dispatch(setModalDisplay(true));
    setCreateOrderDialog(true);
  };

  useEffect(() => {
    if (createOrderDialog && feedback) {
      createOrder(orderData);
      dispatch(setModalFeedback(false));
    }
    setCreateOrderDialog(false);
  }, [feedback]);

  return { payment, customerCart, address: userProfile?.address, totalItems, totalPriceString, handleSelectPayment, handleCrateOrder };
};

export default useCreateOrder;
