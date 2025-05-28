const { Colors } = require("./src/shared/constants/Colors");

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: Colors,
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
      borderRadius: {
        lg: "8px",
        md: "4px",
      },
    },
  },
  plugins: [],
};
