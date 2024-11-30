/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#bcf516",
        secondary: "#7db000",
        accent: "#f5ffc7",
        neutral: "#c1c1c1",
        info: "#ff66d4",
        success: "#e1fbed",
        warning: "#ffffbf",
        error: "#fbeded",
      },
    },
  },
  plugins: [],
};
