// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import categoryReducer from "./slices/categorySlice";  // correct path
import menuReducer from "./slices/menuSlice";
import restaurantsReducer from "./slices/restaurantSlice.js";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
    menu: menuReducer,
    restaurants: restaurantsReducer, 
  },
});

export default store;