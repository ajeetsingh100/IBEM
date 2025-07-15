import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const updateStorage = (items) => {
    setCart(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const addToCart = (product) => {
    const exist = cart.find((item) => item._id === product._id);
    if (exist) {
      const updated = cart.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      );
      updateStorage(updated);
    } else {
      updateStorage([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    updateStorage(updated);
  };

  const updateQty = (id, qty) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, qty: qty } : item
    );
    updateStorage(updated);
  };

  const clearCart = () => {
    updateStorage([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
