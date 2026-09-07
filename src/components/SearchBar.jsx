import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search products…" }) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-circuit-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-circuit-200 bg-white py-2.5 pl-10 pr-9 text-sm text-circuit-950 placeholder:text-circuit-400 focus:border-circuit-500 focus:outline-none focus:ring-2 focus:ring-circuit-500/20"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-circuit-400 hover:text-circuit-700"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
