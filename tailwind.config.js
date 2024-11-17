/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{html,js}', './src/main/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#141010', // Add your custom color here
      },
    },
  },
  plugins: [],
};