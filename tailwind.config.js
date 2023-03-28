/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx"],
  theme: {
    colors: {
      "blue-500": "#0A5EC1",
      "blue-900": "#012244",
      "gray-100": "#F6F6F8",
      "gray-200": "#CED4DA",
      "gray-500": "#868E96",
      "gray-700": "#343A40",
      "red-500": "#EC3137",
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
