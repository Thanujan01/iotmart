import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import Wordmark from "./Wordmark.jsx";
import { SITE_NAME } from "../config";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-circuit-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="group flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <img
            src="/logo.png"
            alt={`${SITE_NAME} logo`}
            className="h-9 w-auto transition-transform duration-300 group-hover:-rotate-6"
          />
          <Wordmark className="text-[1.6rem]" />
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-circuit-700" : "text-circuit-900/70 hover:text-circuit-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCart}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-circuit-900 transition-colors hover:bg-circuit-50"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-led-500 px-1 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-circuit-900 hover:bg-circuit-50 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-circuit-100 bg-white px-4 py-3 md:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-circuit-50 text-circuit-700" : "text-circuit-900/80"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
