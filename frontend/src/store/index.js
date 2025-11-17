// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./restaurantSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
  },
});
