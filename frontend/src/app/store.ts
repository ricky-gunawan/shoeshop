import customerCartReducer from "@/entities/cart/models/customerCartSlice";
import filterReducer from "@/entities/product/models/filterSlice";
import authReducer from "@/features/auth/models/authSlice";
import modalReducer from "@/shared/models/modalSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    auth: authReducer,
    modal: modalReducer,
    customerCart: customerCartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
