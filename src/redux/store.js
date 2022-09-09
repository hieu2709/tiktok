import { configureStore } from "@reduxjs/toolkit";
import isOpenModalLogin from "./isOpenModalLogin";
import userReducers from "./userReducers";
const store = configureStore({
  reducer: {
    user: userReducers,
    isOpen: isOpenModalLogin,
  },
});
export default store;
