/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx"],
  theme: {
    colors: {
      "green-500": "#1eaca4",
      "gray-100": "#F2F4F6",
      "gray-200": "#e6e9ee",
      "gray-500": "#868E96",
      "gray-700": "#343A40",
      "gray-800": "#121a29",
      "gray-900": "#001e2f",
      "red-500": "#ba1a1a",
      white: "#ffffff",
    },
    extend: {
      gridTemplateColumns: {
        dashboard: "280px 1fr",
      },
      dropShadow: {
        default: "0px 2px 10px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};
