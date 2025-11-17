// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
// import categoryReducer from "./categorySlice"; // make sure this exists
import categoryReducer from "./slices/categorySlice";  // correct path

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
  },
});

export default store;
