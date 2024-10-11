/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

    },
  },
  plugins: [
    require("@xpd/tailwind-3dtransforms"),
    // require('tailwindcss-textshadow'), // Add this plugin for text-shadow support
  ],
}
