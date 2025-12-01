// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";

// Import all slices
import cartReducer from "./cartSlice"; 
import categoryReducer from "./slices/categorySlice";
import restaurantsReducer from "./slices/restaurantsSlice";
import tableReducer from "./slices/tableSlice";
import menuReducer from "./slices/menuSlice"; // added menuSlice
// import { fetchRestaurants } from "../../redux/slices/restaurantsSlice";


// Configure store with all reducers
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
    restaurants: restaurantsReducer,
    tables: tableReducer,
    menu: menuReducer, // include menu slice here
  },
});

export default store;
