import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import SEO from "../components/SEO.jsx";
import HeroCircuit from "../components/HeroCircuit.jsx";
import SearchBar from "../components/SearchBar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import CategoryIcon from "../components/CategoryIcon.jsx";
import { PRODUCTS } from "../data/products.js";
import { CATEGORIES } from "../data/categories.js";
import { SITE_NAME } from "../config";

export default function Home() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState(() => {
    const cat = searchParams.get("category");
    return cat ? [cat] : [];
  });

  // Footer/Categories links pass ?category=slug — since they can point back
  // to "/" while already on "/", react to changes here too, not just at
  // first mount.
  useEffect(() => {
    const cat = searchParams.get("category");
    setActiveCategories(cat ? [cat] : []);
  }, [searchParams]);

  // React Router v6 doesn't auto-scroll to a "#shop" hash on navigation.
  useEffect(() => {
    if (location.hash === "#shop") {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  function toggleCategory(slug) {
    setActiveCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      const matchesCategory =
        activeCategories.length === 0 || activeCategories.includes(p.category);
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategories]);

  return (
    <>
      <SEO
        title={`${SITE_NAME} — Arduino, ESP32 & Electronics Components`}
        description="Shop Arduino boards, ESP32 boards, sensors, motors, converters, batteries and more. Add to cart and check out instantly over WhatsApp."
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-circuit-950">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="max-w-md font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Build your next project with parts that actually arrive.
            </h1>
            <p className="mt-4 hidden max-w-md text-sm text-circuit-200 sm:text-base md:block">
              Arduino and ESP32 boards, sensors, converters, motors and wiring —
              browse the catalogue, drop it in your cart, and send the order
              straight to us on WhatsApp.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="rounded-xl bg-led-500 px-6 py-3 text-sm font-semibold text-circuit-950 transition-colors hover:bg-led-600"
              >
                Shop components
              </a>
              <a
                href="/categories"
                className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Browse categories
              </a>
            </div>
            <dl className="mt-10 flex gap-8">
              <div>
                <dt className="font-display text-2xl font-semibold text-white">
                  {PRODUCTS.length}+
                </dt>
                <dd className="text-xs text-circuit-300">components listed</dd>
              </div>
              <div>
                <dt className="font-display text-2xl font-semibold text-white">
                  {CATEGORIES.length}
                </dt>
                <dd className="text-xs text-circuit-300">categories</dd>
              </div>
              <div>
                <dt className="font-display text-2xl font-semibold text-white">
                  1-tap
                </dt>
                <dd className="text-xs text-circuit-300">WhatsApp checkout</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto hidden w-full max-w-md md:block"
          >
            <HeroCircuit />
          </motion.div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-xl font-semibold text-circuit-950 sm:text-2xl">
            All components
          </h2>
          <div className="sm:w-80">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        {/* Category filter chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategories([])}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategories.length === 0
                ? "border-circuit-900 bg-circuit-900 text-white"
                : "border-circuit-200 text-circuit-700 hover:border-circuit-400"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategories.includes(cat.slug);
            return (
              <button
                key={cat.slug}
                onClick={() => toggleCategory(cat.slug)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-circuit-900 bg-circuit-900 text-white"
                    : "border-circuit-200 text-circuit-700 hover:border-circuit-400"
                }`}
              >
                <CategoryIcon name={cat.icon} className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product grid — 2-col staggered masonry on mobile, grid from md up */}
        {filtered.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-2 text-circuit-400">
            <PackageSearch className="h-10 w-10" strokeWidth={1.5} />
            <p className="text-sm">No components match your search.</p>
          </div>
        ) : (
          <div className="mt-6 columns-2 gap-3 sm:gap-4 md:grid md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
