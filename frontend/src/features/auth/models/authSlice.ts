import { createSlice } from "@reduxjs/toolkit";

const initialState: UserCred = {
  roles: [],
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (_, action: { type: string; payload: UserCred }) => action.payload,
    deleteAuth: () => initialState,
  },
});

export const { setAuth, deleteAuth } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
