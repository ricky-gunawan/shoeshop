import currencyNumberToString from "@/shared/utils/currencyNumberToString";
import currencyStringToNumber from "@/shared/utils/currencyStringToNumber";

const useCalculateCartItems = (items: CartItemData[]) => {
  let totalItems = 0;
  let totalPrice = 0;
  items.forEach((product) => {
    totalItems = totalItems + product.quantity;
    totalPrice = totalPrice + currencyStringToNumber(product.price) * product.quantity;
  });
  const totalPriceString = currencyNumberToString(totalPrice);

  return { totalItems, totalPriceString };
};

export default useCalculateCartItems;
