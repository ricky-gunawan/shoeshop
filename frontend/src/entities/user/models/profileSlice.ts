import { createSlice } from "@reduxjs/toolkit";

const initialState: UserProfile = {
  _id: "",
  name: "",
  email: "",
  address: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (_, action: { type: string; payload: UserProfile }) => action.payload,
    deleteAuth: () => initialState,
  },
});

export const { setAuth, deleteAuth } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
