/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b2a3',
          400: '#7d8f7d',
          500: '#637063',
          600: '#4f5a4f',
          700: '#414841',
          800: '#363b36',
          900: '#2e322e',
        },
        lavender: {
          50: '#faf9ff',
          100: '#f3f1ff',
          200: '#eae6ff',
          300: '#d9d1ff',
          400: '#c3b3ff',
          500: '#a78bfa',
          600: '#9366f0',
          700: '#7c3aed',
          800: '#6d28d9',
          900: '#5b21b6',
        },
        sand: {
          50: '#fdfcf9',
          100: '#faf8f1',
          200: '#f5f0e3',
          300: '#ede4cc',
          400: '#e3d3ab',
          500: '#d6be87',
          600: '#c9a96e',
          700: '#b8925a',
          800: '#96764c',
          900: '#7a6140',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};