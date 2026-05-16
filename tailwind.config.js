/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C9A96E',
        'gold-light': '#E8D5B0',
        'gold-dark': '#9A7A45',
        ivory: '#FBF8F3',
        cream: '#F5EFE4',
        rose: '#C8837A',
        'rose-light': '#EDD5D2',
        charcoal: '#2C2418',
        'warm-gray': '#8B7D6B',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}