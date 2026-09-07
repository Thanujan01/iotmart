import { SITE_NAME } from "../config";

// Brand wordmark: "IoT" in a blue gradient + "Mart" in solid ink, matching
// the two-tone logo type. Pass tone="dark" on dark backgrounds so "Mart"
// switches to white. Falls back to plain text if the site is renamed.
export default function Wordmark({ className = "", tone = "light" }) {
  const dark = tone === "dark";

  if (SITE_NAME !== "IoTMart") {
    return (
      <span
        className={`font-display text-xl font-bold tracking-tight ${
          dark ? "text-white" : "text-circuit-950"
        } ${className}`}
      >
        {SITE_NAME}
      </span>
    );
  }

  return (
    <span
      className={`select-none font-display text-xl font-bold leading-none tracking-tight ${className}`}
    >
      <span className="bg-gradient-to-br from-circuit-400 via-circuit-500 to-circuit-700 bg-clip-text text-transparent">
        IoT
      </span>
      <span className={dark ? "text-white" : "text-circuit-950"}>Mart</span>
    </span>
  );
}
