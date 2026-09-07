import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Search } from "lucide-react";
import SEO from "../components/SEO.jsx";
import StockBadge, { stockTier } from "../components/StockBadge.jsx";
import { PRODUCTS } from "../data/products.js";
import { CATEGORY_MAP } from "../data/categories.js";

const TIERS = [
  { key: "low", label: "Low stock", hint: "< 5 units" },
  { key: "moderate", label: "Moderate", hint: "5–10 units" },
  { key: "normal", label: "Normal", hint: "> 10 units" },
];

export default function Admin() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState(null);

  const counts = useMemo(() => {
    return PRODUCTS.reduce(
      (acc, p) => {
        acc[stockTier(p.stock)] += 1;
        return acc;
      },
      { low: 0, moderate: 0, normal: 0 }
    );
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesId = !q || p.id.toLowerCase().includes(q);
      const matchesTier = !tierFilter || stockTier(p.stock) === tierFilter;
      return matchesId && matchesTier;
    });
  }, [query, tierFilter]);

  function handleLogout() {
    sessionStorage.removeItem("iotmart_admin");
    navigate("/");
  }

  return (
    <>
      <SEO title="Admin — IoTMart" />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-circuit-950">
              Inventory dashboard
            </h1>
            <p className="mt-1 text-sm text-circuit-500">
              {PRODUCTS.length} products tracked
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-xl border border-circuit-200 px-3.5 py-2 text-sm font-medium text-circuit-700 hover:bg-circuit-50"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>

        {/* Stock tier summary — click to filter the table below */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TIERS.map((tier) => {
            const active = tierFilter === tier.key;
            return (
              <button
                key={tier.key}
                onClick={() => setTierFilter(active ? null : tier.key)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  active ? "border-circuit-500 bg-circuit-50" : "border-circuit-100 bg-white hover:border-circuit-300"
                }`}
              >
                <p className="text-2xl font-semibold text-circuit-950">{counts[tier.key]}</p>
                <p className="mt-1 text-sm font-medium text-circuit-800">{tier.label}</p>
                <p className="text-xs text-circuit-500">{tier.hint}</p>
              </button>
            );
          })}
        </div>

        {/* Search by product ID */}
        <div className="relative mt-8 max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-circuit-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product ID (e.g. IM1004)"
            className="w-full rounded-full border border-circuit-200 py-2.5 pl-10 pr-4 text-sm focus:border-circuit-500 focus:outline-none focus:ring-2 focus:ring-circuit-500/20"
          />
        </div>

        <div className="mt-5 overflow-x-auto rounded-xl border border-circuit-100">
          <table className="min-w-full divide-y divide-circuit-100 text-sm">
            <thead className="bg-circuit-50 text-left text-xs font-semibold uppercase tracking-wide text-circuit-500">
              <tr>
                <th className="px-4 py-3">Product ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-circuit-50">
              {rows.map((p) => (
                <tr key={p.id} className="hover:bg-circuit-50/60">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-circuit-700">{p.id}</td>
                  <td className="px-4 py-3 text-circuit-950">{p.name}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-circuit-600">
                    {CATEGORY_MAP[p.category]?.label}
                  </td>
                  <td className="px-4 py-3 text-circuit-950">{p.stock}</td>
                  <td className="px-4 py-3">
                    <StockBadge stock={p.stock} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-circuit-400">
                    No products match "{query}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
