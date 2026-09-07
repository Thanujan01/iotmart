export function stockTier(stock) {
  if (stock < 5) return "low";
  if (stock <= 10) return "moderate";
  return "normal";
}

const STYLES = {
  low: "bg-rose-50 text-rose-600 border-rose-200",
  moderate: "bg-amber-50 text-amber-700 border-amber-200",
  normal: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const LABELS = {
  low: "Low stock",
  moderate: "Moderate",
  normal: "In stock",
};

export default function StockBadge({ stock }) {
  const tier = stockTier(stock);
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${STYLES[tier]}`}
    >
      {LABELS[tier]}
    </span>
  );
}
