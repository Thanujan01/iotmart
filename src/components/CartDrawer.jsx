import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import CategoryIcon from "./CategoryIcon.jsx";
import { useCart } from "../context/CartContext.jsx";
import { PRODUCTS } from "../data/products.js";
import { CATEGORY_MAP } from "../data/categories.js";
import { CURRENCY } from "../config";
import { buildWhatsAppOrderLink } from "../utils/whatsapp.js";

const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

function CartItemImage({ id }) {
  const [broken, setBroken] = useState(false);
  const product = PRODUCT_MAP[id];
  const src = product?.images?.[0];
  const icon = CATEGORY_MAP[product?.category]?.icon;

  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-circuit-100 bg-gradient-to-br from-circuit-50 to-circuit-100">
      {src && !broken ? (
        <img
          src={src}
          alt={product?.name ?? ""}
          loading="lazy"
          onError={() => setBroken(true)}
          className="h-full w-full object-contain p-1.5 mix-blend-multiply"
        />
      ) : (
        <CategoryIcon name={icon} className="h-6 w-6 text-circuit-500" />
      )}
    </div>
  );
}

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, removeItem, subtotal, shipping, total } = useCart();
  const [pending, setPending] = useState(null); // item awaiting remove confirmation

  function handleCheckout() {
    const link = buildWhatsAppOrderLink({ items, shipping, total });
    window.open(link, "_blank", "noopener,noreferrer");
  }

  function confirmRemove() {
    if (pending) removeItem(pending.id);
    setPending(null);
  }

  function closeDrawer() {
    setPending(null);
    onClose();
  }

  // Let Esc cancel the remove confirmation.
  useEffect(() => {
    if (!pending) return;
    const onKey = (e) => e.key === "Escape" && setPending(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pending]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-40 bg-circuit-950/40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-circuit-100 px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-circuit-950">
                <ShoppingCart className="h-5 w-5" /> Your Cart
              </h2>
              <button onClick={closeDrawer} aria-label="Close cart" className="text-circuit-500 hover:text-circuit-900">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="mt-10 text-center text-sm text-circuit-500">
                  Your cart is empty. Add a few components to get started.
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-start gap-3 border-b border-circuit-50 pb-4">
                      <Link to={`/product/${item.id}`} onClick={onClose} className="shrink-0">
                        <CartItemImage id={item.id} />
                      </Link>
                      <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-mono text-[11px] text-circuit-500">{item.id}</p>
                          <Link
                            to={`/product/${item.id}`}
                            onClick={onClose}
                            className="block truncate text-sm font-medium text-circuit-950 hover:text-circuit-700"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-sm text-circuit-600">
                            {CURRENCY} {item.price.toLocaleString("en-LK")}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-circuit-200 text-circuit-700 hover:bg-circuit-50"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-circuit-200 text-circuit-700 hover:bg-circuit-50"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => setPending(item)}
                            aria-label="Remove item"
                            className="text-circuit-400 hover:text-rose-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <p className="text-sm font-semibold text-circuit-950">
                            {CURRENCY} {(item.price * item.qty).toLocaleString("en-LK")}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-circuit-100 px-5 py-4">
                <div className="space-y-1.5 text-sm text-circuit-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{CURRENCY} {subtotal.toLocaleString("en-LK")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{CURRENCY} {shipping.toLocaleString("en-LK")}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-base font-semibold text-circuit-950">
                    <span>Total</span>
                    <span>{CURRENCY} {total.toLocaleString("en-LK")}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full rounded-xl bg-led-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-led-600"
                >
                  Buy via WhatsApp
                </button>
              </div>
            )}
          </motion.aside>

          <AnimatePresence>
            {pending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4"
              >
                <div
                  className="absolute inset-0 bg-circuit-950/50"
                  onClick={() => setPending(null)}
                />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  initial={{ opacity: 0, scale: 0.94, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 8 }}
                  transition={{ type: "spring", stiffness: 340, damping: 28 }}
                  className="relative w-full max-w-xs rounded-2xl bg-white p-5 text-center shadow-2xl"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-circuit-950">
                    Remove from cart?
                  </h3>
                  <p className="mt-1 text-sm text-circuit-600">
                    Remove{" "}
                    <span className="font-medium text-circuit-900">
                      {pending.name}
                    </span>{" "}
                    from your cart?
                  </p>
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => setPending(null)}
                      className="flex-1 rounded-xl border border-circuit-200 py-2.5 text-sm font-semibold text-circuit-700 transition-colors hover:bg-circuit-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmRemove}
                      className="flex-1 rounded-xl bg-rose-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
