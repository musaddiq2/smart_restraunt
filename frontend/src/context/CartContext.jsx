import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const CART_KEY = "smart_cart";

/* ---------------- DEFAULT CART SCHEMA ---------------- */

const defaultCart = {
  cartId: crypto.randomUUID(),
  restaurantId: "RESTO_001",

  orderType: "DINE_IN", // DINE_IN or TAKEAWAY

  // DINE-IN
  tableId: "", // auto-filled via QR

  // TAKEAWAY
  customer: {
    name: "",
    phone: "",
  },

  notes: "", // added notes here

  items: [],

  charges: {
    tax: 0,
    packingFee: 0,
  },

  createdAt: Date.now(),
  updatedAt: Date.now(),
};

/* ---------------- PROVIDER ---------------- */

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(CART_KEY);

    if (!saved) return defaultCart;

    try {
      const parsed = JSON.parse(saved);

      return {
        ...defaultCart,
        ...parsed,
        customer: {
          ...defaultCart.customer,
          ...(parsed.customer || {}),
        },
        items: Array.isArray(parsed.items) ? parsed.items : [],
        charges: {
          ...defaultCart.charges,
          ...(parsed.charges || {}),
        },
      };
    } catch (err) {
      console.error("Invalid cart data. Resetting cart.", err);
      return defaultCart;
    }
  });

  /* ---------------- LOCAL STORAGE SYNC ---------------- */
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  /* ---------------- CART ACTIONS ---------------- */

  const addItem = (item) => {
    setCart((prev) => {
      const exists = prev.items.find((i) => i.itemId === item.itemId);

      const updatedItems = exists
        ? prev.items.map((i) =>
            i.itemId === item.itemId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...prev.items, { ...item, quantity: 1 }];

      return {
        ...prev,
        items: updatedItems,
        updatedAt: Date.now(),
      };
    });
  };

  const updateQty = (itemId, qty) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.itemId === itemId ? { ...i, quantity: Math.max(1, qty) } : i
      ),
      updatedAt: Date.now(),
    }));
  };

  const removeItem = (itemId) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.itemId !== itemId),
      updatedAt: Date.now(),
    }));
  };

  const clearCart = () => {
    setCart({
      ...defaultCart,
      cartId: crypto.randomUUID(),
      createdAt: Date.now(),
    });
  };

  /* ---------------- CART META ---------------- */

  const setOrderType = (type) => {
    setCart((prev) => ({
      ...prev,
      orderType: type,
      tableId: type === "DINE_IN" ? prev.tableId : "",
      customer: type === "TAKEAWAY" ? prev.customer : { name: "", phone: "" },
      charges: {
        ...prev.charges,
        packingFee: type !== "DINE_IN" ? 20 : 0,
      },
      updatedAt: Date.now(),
    }));
  };

  const setTable = (tableId) =>
    setCart((prev) => ({
      ...prev,
      tableId,
      updatedAt: Date.now(),
    }));

  const setCustomer = (field, value) =>
    setCart((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value,
      },
      updatedAt: Date.now(),
    }));

  const setNotes = (value) =>
    setCart((prev) => ({
      ...prev,
      notes: value,
      updatedAt: Date.now(),
    }));

  /* ---------------- CALCULATIONS ---------------- */

  const subtotal = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const total = subtotal + cart.charges.tax + cart.charges.packingFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        updateQty,
        removeItem,
        clearCart,
        setOrderType,
        setTable,
        setCustomer,
        setNotes,
        subtotal,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
