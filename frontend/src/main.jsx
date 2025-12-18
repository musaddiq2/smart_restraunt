
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./redux/store";
import { AppProvider } from "./context/AppContext";
import { CartProvider } from "./context/CartContext"; // ✅ ADD THIS
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <AppProvider>
      <CartProvider>      {/* ✅ Cart context added */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </AppProvider>
  </Provider>
);

