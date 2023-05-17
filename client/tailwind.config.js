/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Mulish: ["Mulish", "sans-serif"],
      },
      colors: {
        green: {
          100: "#D1FAE8",
          200: "#A5F6D9",
          300: "#74E3C6",
          400: "#4DC9B3",
          500: "#1EA59A",
        },
        red: {
          100: "#FFEBDC",
          200: "#FFD2BA",
          300: "#FFB397",
          400: "#FF967D",
          500: "#FF6653",
        },
        gray: {
          100: "#E1EFF6",
          200: "#C4DEED",
          300: "#95B3C9",
          400: "#647D94",
          500: "#2C3C4D",
        },
      },
    },
  },
  plugins: [],
};
