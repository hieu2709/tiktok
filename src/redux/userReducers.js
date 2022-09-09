import { createSlice } from "@reduxjs/toolkit";

export const UserReducer = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {},
  },
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
    },
    userLogout: (state) => {
      state.user = {};
    },
    userUpdate: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userLogin, userLogout, userUpdate } = UserReducer.actions;
export const selectUser = (state) => state.user.user;
export default UserReducer.reducer;
