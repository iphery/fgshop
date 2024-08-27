import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1E40AF", // Example primary color (blue-800)
        secondary: "#F59E0B", // Example secondary color (amber-500)
        accent: "#10B981", // Example accent color (emerald-500)
        muted: "#6B7280", // Example muted color (gray-500)
        light: "#F3F4F6", // Example light color (gray-100)
        dark: "#111827", // Example dark color (gray-900)
        danger: "#EF4444", // Example danger color (red-500)
        success: "#22C55E", // Example success color (green-500)
        warning: "#F97316", // Example warning color (orange-500)
        gray: "#f4f6f6",
        background: "#FFFFFF",
        yellow: "#FFFF00",
        blurgreen: "#eafaf1 ",
      },
    },
  },
  plugins: [],
};

export default config;
