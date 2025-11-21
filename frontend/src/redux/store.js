// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import categoryReducer from "./slices/categorySlice";  // correct path
import menuReducer from "./slices/menuSlice";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
    menu: menuReducer,
  },
});

export default store;