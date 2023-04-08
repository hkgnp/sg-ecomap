module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/index.min.js",
  ],
  theme: {
    extend: {
      zIndex: {
        high: "9999",
      },
      maxHeight: {
        90: "90%",
      },
    },
  },
  plugins: [],
};
