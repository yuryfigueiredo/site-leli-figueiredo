import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#09090B",
        surface: "#121216",
        line: "#27272A",
        amber: { DEFAULT: "#F59E0B" },
        paper: "#FAFAFA",
        mute: "#A1A1AA",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        "serif-italic": ["var(--font-serif-italic)", "var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Escala fluida
        "fluid-sm": ["clamp(0.9375rem, 0.9rem + 0.15vw, 1rem)", { lineHeight: "1.6" }],
        "fluid-base": ["clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", { lineHeight: "1.75" }],
        "fluid-lead": ["clamp(1.125rem, 1.02rem + 0.5vw, 1.375rem)", { lineHeight: "1.6" }],
        "fluid-h3": ["clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", { lineHeight: "1.15" }],
        "fluid-h2": ["clamp(2.25rem, 1.6rem + 2.8vw, 4rem)", { lineHeight: "1.05" }],
        "fluid-h1": ["clamp(3.5rem, 2rem + 8vw, 9rem)", { lineHeight: "0.92" }],
        "fluid-statement": ["clamp(1.75rem, 1.3rem + 1.8vw, 2.875rem)", { lineHeight: "1.12" }],
      },
      maxWidth: {
        shell: "1320px",
        prose: "66ch",
      },
      spacing: {
        header: "4rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
        "fade-in": "fade-in 0.25s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
