import { configureStore } from "@reduxjs/toolkit";

// Import slices
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import restaurantsReducer from "./slices/restaurantsSlice";
import tableReducer from "./slices/tableSlice";
import menuReducer from "./slices/menuSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
    restaurants: restaurantsReducer,
    tables: tableReducer,
    menu: menuReducer,
  },
});

export default store;
