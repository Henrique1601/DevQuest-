import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080B11",
        surface: {
          DEFAULT: "#0F1623",
          hover: "#152033",
          card: "#121A2A",
          border: "#1E2C45",
        },
        primary: {
          50: "#ECFEFF",
          100: "#CFFAFE",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          DEFAULT: "#06B6D4",
        },
        accent: {
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          DEFAULT: "#8B5CF6",
        },
        brand: {
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(6, 182, 212, 0.25)",
        "glow-accent": "0 0 35px -5px rgba(139, 92, 246, 0.25)",
      }
    },
  },
  plugins: [],
};

export default config;
