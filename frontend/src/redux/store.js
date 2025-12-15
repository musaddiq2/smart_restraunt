import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // adjust path if needed
import categoryReducer from "./slices/categorySlice";
import restaurantReducer from "./slices/restaurantSlice";
import tableReducer from "./slices/tableSlice"; // <--- added

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
    restaurant: restaurantReducer,
    tables: tableReducer,
  },
});

export default store;
