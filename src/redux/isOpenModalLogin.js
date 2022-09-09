import { createSlice } from "@reduxjs/toolkit";

export const OpenModalReducer = createSlice({
  name: "open modal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    modalOpen: (state) => {
      state.isOpen = true;
    },
    modalClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { modalOpen, modalClose } = OpenModalReducer.actions;
export const selectIsOpenModal = (state) => state.isOpen.isOpen;
export default OpenModalReducer.reducer;
