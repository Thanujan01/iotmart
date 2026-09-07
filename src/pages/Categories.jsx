import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../components/SEO.jsx";
import CategoryIcon from "../components/CategoryIcon.jsx";
import { CATEGORIES } from "../data/categories.js";
import { PRODUCTS } from "../data/products.js";
import { SITE_NAME } from "../config";

export default function Categories() {
  const counts = PRODUCTS.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <SEO
        title={`Shop by Category — ${SITE_NAME}`}
        description="Browse IoTMart by category: Arduino boards, ESP32 boards, sensors, converters, motors, batteries, wires, LEDs and wheels."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-semibold text-circuit-950 sm:text-3xl">
          Shop by category
        </h1>
        <p className="mt-2 max-w-lg text-sm text-circuit-600">
          Jump straight to the parts you need.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/?category=${cat.slug}#shop`}
              className="group relative flex items-center gap-4 overflow-hidden rounded-lg border border-circuit-100 bg-white p-5 transition-colors hover:border-circuit-300"
            >
              <span className="absolute inset-y-0 left-0 w-1 bg-circuit-200 transition-colors group-hover:bg-led-500" />
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-circuit-50 text-circuit-600 transition-colors group-hover:bg-circuit-900 group-hover:text-led-400">
                <CategoryIcon name={cat.icon} className="h-7 w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-base font-semibold text-circuit-950">
                  {cat.label}
                </h2>
                <p className="text-xs text-circuit-500">
                  {counts[cat.slug] || 0} products
                </p>
              </div>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-circuit-300 transition-transform group-hover:translate-x-1 group-hover:text-circuit-700" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
