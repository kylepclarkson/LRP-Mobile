/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./design-system/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
}
