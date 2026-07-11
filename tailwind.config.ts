import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07090D",
          900: "#0C1017",
          850: "#10151E",
          800: "#151B26",
          700: "#1C2433",
          600: "#273142",
          500: "#3D4B5F",
          400: "#6B7A8F",
          300: "#9AA8B8",
        },
        parchment: {
          50: "#FFFFFF",
          100: "#F4F6F8",
          200: "#E2E7ED",
        },
        brand: {
          300: "#FF9A4D",
          400: "#FF7A1A",
          500: "#FF6B00",
          600: "#E55F00",
          700: "#C45200",
        },
        survey: {
          400: "#4ADEA8",
          500: "#22C58B",
        },
        flag: {
          400: "#FF7B72",
          500: "#F04438",
        },
        signal: {
          blue: "#4C8DFF",
          violet: "#A78BFA",
          gold: "#F5C542",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(255,255,255,0.04), 0 12px 40px -20px rgba(0,0,0,0.55)",
        glow: "0 0 24px -6px rgba(255,107,0,0.35)",
        "glow-soft": "0 0 40px -12px rgba(255,107,0,0.2)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.85)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.45s ease-out both",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
