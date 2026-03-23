import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: "var(--color-app)",
        panel: "var(--color-panel)",
        surface: "var(--color-surface)",
        tinted: "var(--color-tinted)",
        border: "var(--color-border)",
        heading: "var(--color-heading)",
        body: "var(--color-body)",
        muted: "var(--color-muted)",
        primary: "var(--color-primary)",
        primaryDeep: "var(--color-primary-deep)",
        primarySoft: "var(--color-primary-soft)",
        teal: "var(--color-teal)",
        tealSoft: "var(--color-teal-soft)",
        violet: "var(--color-violet)",
        violetSoft: "var(--color-violet-soft)",
        amber: "var(--color-amber)",
        amberSoft: "var(--color-amber-soft)",
        rose: "var(--color-rose)",
        roseSoft: "var(--color-rose-soft)"
      },
      boxShadow: {
        soft: "0 10px 28px rgba(23, 32, 51, 0.08)",
        lift: "0 22px 48px rgba(23, 32, 51, 0.14)",
        float: "0 28px 58px rgba(23, 32, 51, 0.14)",
        focus: "0 0 0 3px rgba(95, 115, 255, 0.24)",
        panel: "0 1px 3px rgba(23, 32, 51, 0.04), 0 18px 44px rgba(23, 32, 51, 0.09)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "slide-left": {
          "0%": { opacity: "0", transform: "translateX(8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "slide-right": {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseDot: {
          "0%, 80%, 100%": { opacity: "0.2", transform: "translateY(0)" },
          "40%": { opacity: "1", transform: "translateY(-1px)" }
        },
        "pulse-soft": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.04)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "0.8" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        "fade-up": "fade-up 240ms ease-out",
        "fade-in": "fade-in 200ms ease-out",
        "slide-left": "slide-left 230ms ease-out",
        "slide-right": "slide-right 230ms ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-dot": "pulseDot 1.2s ease-in-out infinite",
        "pulse-soft": "pulse-soft 1.4s ease-in-out infinite",
        shimmer: "shimmer 1.6s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;

