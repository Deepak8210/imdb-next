import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-dark": "#04152d",
        "custom-faded": "rgba(4, 21, 45, 0.6)", // Faded version of #04152d
        "custom-lighter": "rgba(4, 21, 45, 0.01)", // Faded version of #04152d
      },
    },
  },
  plugins: [],
} satisfies Config;
