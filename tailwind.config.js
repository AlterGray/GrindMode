const { Colors } = require('./constants/Colors');

module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          text: Colors.light.text,
          background: Colors.light.background,
          tint: Colors.light.tint,
          icon: Colors.light.icon,
          tabIconDefault: Colors.light.tabIconDefault,
          tabIconSelected: Colors.light.tabIconSelected,
          borderColor: Colors.light.secondaryBackground,
          highlight: Colors.light.highlight,
        },
        dark: {
          primaryText: Colors.dark.primaryText,
          secondaryText: Colors.dark.secondaryText,
          accentText: Colors.dark.accentText,
          lightText: Colors.dark.lightText,
          primaryBackground: Colors.dark.primaryBackground,
          secondaryBackground: Colors.dark.secondaryBackground,
          darkBackground: Colors.dark.darkBackground,
          tint: Colors.dark.tint,
          icon: Colors.dark.icon,
          tabIconDefault: Colors.dark.tabIconDefault,
          tabIconSelected: Colors.dark.tabIconSelected,
          blue: Colors.dark.blue,
          accent: Colors.dark.accent,
          highlight: Colors.dark.highlight,
          borderColor: Colors.dark.borderColor,
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'lg': '8px',
        'md': '4px',
      },
    },
  },
  plugins: [],
}
