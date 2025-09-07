/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class', // This enables the class-based dark mode
  theme: {
    extend: {
      // Your custom theme extensions
    },
  },
  plugins: [],
}
