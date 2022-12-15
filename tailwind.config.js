/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      serif: 'Playfair Display',
      sans: 'Source Sans Pro',
    },
    colors: {
      main: '#FFFBF6',
      gray: '#90908B',
      'light-red': '#EA7F70',
      'light-yellow': '#EADE70',
      'light-green': '#BBEA70',
      'red-100': '#FDE8E8',
      'red-700': '#C81E1E',
    },
    extend: {},
  },
  plugins: [],
};
