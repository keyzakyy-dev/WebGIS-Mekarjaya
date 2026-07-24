/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#202940',
        secondary: '#4B4038',
        accent: '#9A8678',
        background: '#F6F3EF',
        dark: {
          primary: '#1a1f2e',
          secondary: '#2d2420',
          background: '#0f1419',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        glow: '0 0 20px rgba(154, 134, 120, 0.5)',
      },
    },
  },
  plugins: [],
}
