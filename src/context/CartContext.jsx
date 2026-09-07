import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SHIPPING_FEE } from "../config";

const CartContext = createContext(null);
const STORAGE_KEY = "iotmart_cart";

function readInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, qty },
      ];
    });
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );
  const shipping = items.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;
  const itemCount = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);

  const value = {
    items,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    subtotal,
    shipping,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
