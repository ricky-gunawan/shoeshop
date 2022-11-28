import { createSlice } from "@reduxjs/toolkit";

const initialState: CartItemData[] = [];

const customerCartSlice = createSlice({
  name: "customerCart",
  initialState,
  reducers: {
    setCartData: (_, action: { payload: CartItem[] }) => action.payload,
    addProductToCart: (state, action: { payload: Product }) => {
      let itemNotExist = true;
      state.forEach((item, index) => {
        if (item.product === action.payload._id) {
          itemNotExist = false;
          state[index].quantity += 1;
        }
      });
      if (itemNotExist) {
        const cartItemData: CartItemData = {
          product: action.payload._id,
          name: action.payload.name,
          img: action.payload.img,
          price: action.payload.price,
          brand: action.payload.brand,
          color: action.payload.color,
          quantity: 1,
        };
        state.push(cartItemData);
      }
    },
    increaseItemQty: (state, action: { payload: string }) => {
      state.forEach((item, index) => {
        if (item.product === action.payload) {
          state[index].quantity += 1;
        }
      });
    },
    decreaseItemQty: (state, action: { payload: string }) => {
      state.forEach((item, index) => {
        if (item.product === action.payload) {
          item.quantity > 1 && (state[index].quantity -= 1);
        }
      });
    },
    deleteCartItem: (state, action: { payload: string }) => {
      state.forEach((item, index) => {
        if (item.product === action.payload) {
          state.splice(index, 1);
        }
      });
    },
  },
});

export const { addProductToCart, setCartData, increaseItemQty, decreaseItemQty, deleteCartItem } = customerCartSlice.actions;

const customerCartReducer = customerCartSlice.reducer;
export default customerCartReducer;
