import { useGetCustomerCartApi, useUpdateCustomerCartApi } from "@/entities/cart/api";
import useCalculateCartItems from "@/entities/cart/hooks/useCalculateCartItems";
import { addProductToCart, decreaseItemQty, deleteCartItem, increaseItemQty, setCartData } from "@/entities/cart/models/customerCartSlice";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import useAppSelector from "@/shared/hooks/useAppSelector";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useUpdateCart = () => {
  const dispatch = useAppDispatch();
  const handleIncreaseItemQty = (productId: string) => {
    dispatch(increaseItemQty(productId));
  };
  const handleDecreaseItemQty = (productId: string) => {
    dispatch(decreaseItemQty(productId));
  };
  const handleDeleteItem = (productId: string) => {
    dispatch(deleteCartItem(productId));
  };
  const handleAddProductToCart = (product: Product) => {
    dispatch(addProductToCart(product));
  };

  const getCustomerCartApi = useGetCustomerCartApi();
  const updateCustomerCartApi = useUpdateCustomerCartApi();
  const customerCart = useAppSelector((store) => store.customerCart);
  const { totalItems, totalPriceString } = useCalculateCartItems(customerCart);
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

  const [isDataReady, setIsDataReady] = useState(false);
  const { refetch, isLoading, isPaused } = useQuery({
    queryKey: ["customerCart"],
    queryFn: getCustomerCartApi,
    enabled: false,
    onSuccess: (data) => {
      dispatch(setCartData(data));
      setIsDataReady(true);
    },
  });

  const { mutate: updateCart } = useMutation({
    mutationFn: updateCustomerCartApi,
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    isDataReady && updateCart(updatedCartItems);
  }, [customerCart]);

  return { isLoading, isPaused, customerCart, totalItems, totalPriceString, handleAddProductToCart, handleIncreaseItemQty, handleDecreaseItemQty, handleDeleteItem };
};

export default useUpdateCart;
