import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: "#E85D26",
        "brand-muted": "#FDF0EA",
        surface: "#FFFFFF",
        bg: "#F5F5F4",
        sidebar: "#1A1A1A",
        border: "#E5E7EB",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        foreground: "#111111",
        muted: {
          DEFAULT: "#F5F5F4",
          foreground: "#6B7280",
        },
        input: "#E5E7EB",
        ring: "#E85D26",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111111",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        xl: "16px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,0.06)",
        md: "0 4px 12px rgba(0,0,0,0.08)",
        lg: "0 8px 24px rgba(0,0,0,0.12)",
      },
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
        serif: ["DM Serif Display", ...defaultTheme.fontFamily.serif],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        "page-radial":
          "radial-gradient(circle at top right, rgba(232,93,38,0.12), transparent 24%)",
        "page-linear": "linear-gradient(180deg, #FAF7F4 0%, #F5F5F4 44%)",
        "hero-wash": "linear-gradient(135deg, rgba(253,240,234,0.82), rgba(255,255,255,0.96))",
        "detail-overlay": "linear-gradient(180deg, rgba(17,17,17,0.18), rgba(17,17,17,0.82))",
      },
    },
  },
  plugins: [animate],
};

export default config;
