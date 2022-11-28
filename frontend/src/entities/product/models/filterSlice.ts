import { createSlice } from "@reduxjs/toolkit";

type filter = {
  brand: "all" | "nike" | "adidas" | "reebok" | "vans" | "new_balance" | "converse" | "puma";
  color: "all" | "black" | "red" | "white" | "blue" | "green";
};

const initialState: filter = {
  brand: "all",
  color: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { setBrand, setColor } = filterSlice.actions;

const filterReducer = filterSlice.reducer;
export default filterReducer;
