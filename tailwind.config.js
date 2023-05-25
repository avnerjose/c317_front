/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./app/**/*.tsx"],
  theme: {
    colors: {
      "green-500": "#1eaca4",
      "green-700": "#17827C",
      "gray-100": "#F2F4F6",
      "gray-200": "#e6e9ee",
      "gray-500": "#868E96",
      "gray-700": "#161F32",
      "gray-800": "#121a29",
      "red-500": "#ba1a1a",
      "red-200": "#ECDFDF",
      "yellow-500": "#EBA417",
      white: "#ffffff",
      transparent: "transparent",
    },
    extend: {
      gridTemplateColumns: {
        dashboard: "280px 1fr",
      },
      dropShadow: {
        default: "0px 2px 10px rgba(0,0,0,0.25)",
      },
      backgroundImage: {
        "caret-up-down": "url('/img/caret-up-down.svg')",
      },
      translate: {
        "center-modal": "(-50%,-50%)",
      },
    },
  },
  plugins: [],
};
