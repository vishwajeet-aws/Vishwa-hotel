/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: '#F8F2E8',
        ivory: '#FFFDFC',
        stone: '#8C7E73',
        ink: '#1F1A17',
        gold: '#B68C5A',
        mist: '#EEF2F1',
        pine: '#1F3A37',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(31, 26, 23, 0.08)',
        card: '0 10px 30px rgba(31, 26, 23, 0.08)',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        hero: 'linear-gradient(135deg, rgba(31, 58, 55, 0.84), rgba(22, 20, 17, 0.65))',
      },
    },
  },
  plugins: [],
};
