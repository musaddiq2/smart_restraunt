import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const CART_KEY = "smart_cart";

const defaultCart = {
  cartId: crypto.randomUUID(),
  restaurantId: "RESTO_001",
  orderType: "DINE_IN",
  tableId: "",
  customer: { name: "", phone: "" },
  notes: "",
  items: [],
  charges: { tax: 0, packingFee: 0 },
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (!saved) return defaultCart;
    try {
      return { ...defaultCart, ...JSON.parse(saved) };
    } catch {
      return defaultCart;
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
