/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#f4b968',
          400: '#f1a94e',
          500: '#f1a94e',
        },
        platinum: {
          100: '#f7f7f7',
          200: '#e5e5e5',
          300: '#d1d1d1',
          400: '#b8b8b8',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'luxury-float': 'luxury-float 8s ease-in-out infinite',
        'luxury-fade-in': 'luxury-fade-in 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'luxury-zoom-in': 'luxury-zoom-in 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'luxury-slide-up': 'luxury-slide-up 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      perspective: {
        '1500': '1500px',
      },
      backdropBlur: {
        'xl': '25px',
        '2xl': '30px',
      }
    },
  },
  plugins: [],
}