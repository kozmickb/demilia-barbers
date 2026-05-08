/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: {
          50: '#fbf8f3',
          100: '#f4ecdf',
          200: '#e8dcc4',
          300: '#d8c7a3',
        },
        ink: {
          950: '#0d0d0d',
          900: '#171717',
          800: '#1f1f1f',
          700: '#2a2a2a',
          500: '#525252',
          400: '#737373',
        },
        italia: {
          green: '#0a6b3b',
          red: '#b71c2a',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 30px 60px -30px rgba(0,0,0,0.25)',
        card: '0 1px 0 rgba(23,23,23,0.06), 0 10px 30px -15px rgba(23,23,23,0.18)',
      },
    },
  },
  plugins: [],
};
