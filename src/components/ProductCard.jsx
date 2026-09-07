import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import CategoryIcon from "./CategoryIcon.jsx";
import { CATEGORY_MAP } from "../data/categories.js";
import { CURRENCY } from "../config";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const category = CATEGORY_MAP[product.category];
  const thumb = product.images?.[0] ?? product.image;
  const href = `/product/${product.id}`;

  function handleAdd() {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-circuit-100 bg-white shadow-sm transition-shadow hover:shadow-lg hover:shadow-circuit-900/5"
    >
      <Link to={href} className="block">
        <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-circuit-50 to-circuit-100 bg-breadboard">
          {thumb && !imgError ? (
            <img
              src={thumb}
              alt={product.name}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              className="h-full w-full object-contain p-3 mix-blend-multiply"
            />
          ) : (
            <CategoryIcon name={category?.icon} className="h-12 w-12 text-circuit-600 sm:h-14 sm:w-14" />
          )}
        </div>
      </Link>

      <div className="p-3 sm:p-4">
        <p className="font-mono text-[11px] text-circuit-500">{product.id}</p>
        <Link to={href}>
          <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold text-circuit-950 transition-colors hover:text-circuit-700 sm:text-base">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 font-display text-base font-semibold text-circuit-700 sm:text-lg">
          {CURRENCY} {product.price.toLocaleString("en-LK")}
        </p>

        <button
          onClick={handleAdd}
          className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-semibold transition-colors ${
            added
              ? "bg-led-500 text-white"
              : "bg-circuit-900 text-white hover:bg-circuit-700"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
