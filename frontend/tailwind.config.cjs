/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {
      keyframes: {
        translation: {
          "0%, 100%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(300%)" },
        },
      },
      animation: {
        translation: "translation 3s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
