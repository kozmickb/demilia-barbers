/** @type {import('tailwindcss').Config} */
const rgb = (v) => `rgb(${v} / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: {
          50: rgb('var(--bone-50)'),
          100: rgb('var(--bone-100)'),
          200: rgb('var(--bone-200)'),
          300: rgb('var(--bone-300)'),
        },
        ink: {
          400: rgb('var(--ink-400)'),
          500: rgb('var(--ink-500)'),
          700: rgb('var(--ink-700)'),
          800: rgb('var(--ink-800)'),
          900: rgb('var(--ink-900)'),
          950: rgb('var(--ink-950)'),
        },
        italia: {
          green: rgb('var(--accent)'),
          red: rgb('var(--accent-2)'),
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-body)'],
      },
      boxShadow: {
        soft: '0 30px 60px -30px rgba(0,0,0,0.25)',
        card: '0 1px 0 rgba(23,23,23,0.06), 0 10px 30px -15px rgba(23,23,23,0.18)',
      },
    },
  },
  plugins: [],
};
