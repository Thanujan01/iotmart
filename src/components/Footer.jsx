import { Link } from "react-router-dom";
import Wordmark from "./Wordmark.jsx";
import { CATEGORIES } from "../data/categories.js";
import { SITE_NAME, SITE_TAGLINE, WHATSAPP_NUMBER } from "../config";

export default function Footer() {
  return (
    <footer className="border-t border-circuit-100 bg-circuit-950 text-circuit-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt={`${SITE_NAME} logo`} className="h-9 w-auto" />
            <Wordmark tone="dark" className="text-[1.6rem]" />
          </div>
          <p className="mt-3 max-w-xs text-sm text-circuit-200">{SITE_TAGLINE}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Categories</h3>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-circuit-200">
            {CATEGORIES.slice(0, 8).map((c) => (
              <li key={c.slug}>
                <Link to={`/?category=${c.slug}`} className="hover:text-led-400">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Order with us</h3>
          <p className="mt-3 text-sm text-circuit-200">
            Add items to your cart and check out straight to WhatsApp — no account needed.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-led-400 hover:text-led-500"
          >
            Chat on WhatsApp →
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-circuit-300">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
