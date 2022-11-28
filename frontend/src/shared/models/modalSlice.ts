import { createSlice } from "@reduxjs/toolkit";

type InitialStateProps = {
  content: {
    header: string;
    message: string;
  };
  display: boolean;
  needFeedback: boolean;
  feedback: boolean;
};

const initialState: InitialStateProps = {
  content: { header: "", message: "" },
  display: false,
  needFeedback: false,
  feedback: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalContent: (state, action: { payload: { header: string; message: string }; type: string }) => {
      state.content = action.payload;
    },
    setModalDisplay: (state, action) => {
      state.display = action.payload;
    },
    setModalNeedFeedback: (state, action) => {
      state.needFeedback = action.payload;
    },
    setModalFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    resetModal: () => initialState,
  },
});

export const { setModalContent, setModalDisplay, setModalNeedFeedback, setModalFeedback, resetModal } = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;
