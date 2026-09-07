/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        circuit: {
          50: "#eef4ff",
          100: "#dbe7fe",
          200: "#bfd7fe",
          300: "#93bbfd",
          400: "#5f97fa",
          500: "#3a75f3",
          600: "#2456e6",
          700: "#1c42c9",
          800: "#1b389f",
          900: "#0f1f5c",
          950: "#0a1440",
        },
        led: {
          400: "#5eead4",
          500: "#22d3c4",
          600: "#0ea5a8",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        breadboard:
          "radial-gradient(circle, rgba(28,66,201,0.12) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "18px 18px",
      },
      boxShadow: {
        node: "0 0 0 3px rgba(34,211,196,0.25)",
      },
      keyframes: {
        pulseglow: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
        trace: {
          "0%": { strokeDashoffset: "240" },
          "100%": { strokeDashoffset: "0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        pulseglow: "pulseglow 2s ease-in-out infinite",
        trace: "trace 2.4s ease-out forwards",
        floaty: "floaty 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
