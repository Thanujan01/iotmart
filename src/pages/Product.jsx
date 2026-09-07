import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Plus,
} from "lucide-react";
import SEO from "../components/SEO.jsx";
import CategoryIcon from "../components/CategoryIcon.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";
import { CATEGORY_MAP } from "../data/categories.js";
import { CURRENCY, SITE_NAME, WHATSAPP_NUMBER } from "../config";
import { useCart } from "../context/CartContext.jsx";

export default function Product() {
  const { id } = useParams();
  const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-circuit-950">
          Product not found
        </h1>
        <p className="mt-2 text-sm text-circuit-600">
          We couldn&apos;t find a product with the ID &ldquo;{id}&rdquo;.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-xl bg-circuit-900 px-6 py-3 text-sm font-semibold text-white hover:bg-circuit-700"
        >
          Back to shop
        </Link>
      </section>
    );
  }

  // Remount on id change so gallery + "added" state reset cleanly.
  return <ProductView key={product.id} product={product} />;
}

function ProductView({ product }) {
  const { addItem } = useCart();
  const category = CATEGORY_MAP[product.category];
  const [added, setAdded] = useState(false);
  const [broken, setBroken] = useState(() => new Set());
  const [active, setActive] = useState(0);

  const images = (product.images ?? []).filter((u) => !broken.has(u));
  const current = Math.min(active, Math.max(0, images.length - 1));
  const scrollerRef = useRef(null);

  // Swipe / slide: the strip is a native scroll-snap container, so a finger
  // drag on mobile just works. goTo() drives it from the arrows and thumbs;
  // onScroll() keeps the dots and thumbnails in sync with the finger.
  function goTo(i) {
    const el = scrollerRef.current;
    const clamped = Math.max(0, Math.min(i, images.length - 1));
    setActive(clamped);
    if (el) el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }

  function onScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setActive((prev) => (prev === i ? prev : i));
  }

  const related = useMemo(() => {
    const sameCat = PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
    if (sameCat.length >= 4) return sameCat;
    const others = PRODUCTS.filter(
      (p) => p.category !== product.category && p.id !== product.id
    );
    return [...sameCat, ...others].slice(0, 8);
  }, [product]);

  function handleAdd() {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    [
      "Hi IoTMart, I'd like to order:",
      "",
      `• ${product.id} — ${product.name}`,
      `${CURRENCY} ${product.price.toLocaleString("en-LK")}`,
    ].join("\n")
  )}`;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <SEO
        title={`${product.name} (${product.id}) — ${SITE_NAME}`}
        description={product.blurb}
      />

      <Link
        to="/#shop"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-circuit-600 transition-colors hover:text-circuit-800"
      >
        <ArrowLeft className="h-4 w-4" />
        All components
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="group relative overflow-hidden rounded-2xl border border-circuit-100 bg-gradient-to-br from-circuit-50 to-circuit-100 bg-breadboard">
            {images.length === 0 ? (
              <div className="flex aspect-square items-center justify-center">
                <CategoryIcon
                  name={category?.icon}
                  className="h-20 w-20 text-circuit-500"
                />
              </div>
            ) : (
              <div
                ref={scrollerRef}
                onScroll={onScroll}
                className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {images.map((u) => (
                  <div
                    key={u}
                    className="flex aspect-square w-full shrink-0 snap-center items-center justify-center"
                  >
                    <img
                      src={u}
                      alt={product.name}
                      draggable={false}
                      decoding="async"
                      onError={() =>
                        setBroken((prev) => new Set(prev).add(u))
                      }
                      className="h-full w-full select-none object-contain p-6 mix-blend-multiply"
                    />
                  </div>
                ))}
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(current - 1)}
                  disabled={current === 0}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 p-1.5 text-circuit-700 shadow-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-0 sm:block"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(current + 1)}
                  disabled={current === images.length - 1}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 p-1.5 text-circuit-700 shadow-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-0 sm:block"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
                  {images.map((u, i) => (
                    <span
                      key={u}
                      className={`h-1.5 rounded-full transition-all ${
                        i === current ? "w-4 bg-circuit-700" : "w-1.5 bg-circuit-300"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {images.map((u, i) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-colors ${
                    i === current
                      ? "border-circuit-600"
                      : "border-circuit-100 hover:border-circuit-300"
                  }`}
                >
                  <img
                    src={u}
                    alt=""
                    draggable={false}
                    className="h-full w-full object-contain p-1 mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-circuit-500">
            <CategoryIcon name={category?.icon} className="h-4 w-4" />
            <Link
              to={`/?category=${product.category}`}
              className="transition-colors hover:text-circuit-700"
            >
              {category?.label}
            </Link>
          </div>

          <p className="mt-2 font-mono text-xs text-circuit-500">{product.id}</p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-circuit-950 sm:text-3xl">
            {product.name}
          </h1>

          <p className="mt-4 font-display text-2xl font-bold text-circuit-800">
            {CURRENCY} {product.price.toLocaleString("en-LK")}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-circuit-600">
            {product.blurb}
          </p>

          {product.specs?.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-circuit-500">
                Specifications
              </h2>
              <ul className="mt-3 space-y-2">
                {product.specs.map((spec, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm leading-relaxed text-circuit-700"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-led-600"
                      strokeWidth={2.5}
                    />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleAdd}
              className={`flex items-center justify-center gap-1.5 rounded-xl px-6 py-3 text-sm font-semibold transition-colors ${
                added
                  ? "bg-led-500 text-white"
                  : "bg-circuit-900 text-white hover:bg-circuit-700"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Added to cart
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Add to Cart
                </>
              )}
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-circuit-200 px-6 py-3 text-sm font-semibold text-circuit-800 transition-colors hover:border-circuit-400 hover:bg-circuit-50"
            >
              <MessageCircle className="h-4 w-4 text-green-700" /> Buy on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Matching products */}
      {related.length > 0 && (
        <div className="mt-16">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold text-circuit-950 sm:text-xl">
              Matching products
            </h2>
            <Link
              to={`/?category=${product.category}`}
              className="text-sm font-medium text-circuit-600 hover:text-circuit-800"
            >
              See all →
            </Link>
          </div>

          <div className="-mx-4 mt-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:-mx-6 sm:px-6">
            {related.map((p) => (
              <div
                key={p.id}
                className="w-40 shrink-0 snap-start sm:w-48"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
