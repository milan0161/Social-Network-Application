/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        light_purple: '#e9c4ff',
        light_purple1: '#ffe3ff',
        dark_purple: '#1e1732',
        grey: '#78767b',
        light_grey: '#e2e2e2',
      },
    },
  },
  plugins: [],
};
