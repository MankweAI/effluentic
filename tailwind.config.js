/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        "brand-navy": "#0A2540",
        "brand-light-gray": "#F6F9FC",
        "brand-action-green": "#19D479",
        "brand-steel": "#6B7C93",
        "brand-off-white": "#FFFFFF",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
