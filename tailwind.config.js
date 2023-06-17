// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#32858A",
        "main-color-hover": "#219797",
        "main-color-disabled": "rgba(0, 133, 133, 0.6);",
        secondary: "#0B2C78",
        "text-color": "#ffffff",
        tertiary: "#DE9400",
        c8: "#c8c8c8",
        25: "#252525",
        "light-black": "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
