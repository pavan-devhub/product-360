/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Telugu"', 'ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Noto Color Emoji"', '"Segoe UI Emoji"'],
        emoji: ['"Apple Color Emoji"', '"Noto Color Emoji"', '"Segoe UI Emoji"', 'sans-serif'],
      },
      colors: {
        canvas: '#f6f8f5',
        brand: {
          50: '#ecfdf3',
          100: '#d1fadf',
          200: '#a6f4c5',
          300: '#6ce9a6',
          400: '#32d583',
          500: '#12b76a',
          600: '#039855',
          700: '#027a48',
          800: '#05603a',
          900: '#054f31',
          950: '#053321',
        },
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(16 24 40 / 0.04), 0 1px 3px 0 rgb(16 24 40 / 0.06)',
        card: '0 1px 2px 0 rgb(16 24 40 / 0.04), 0 10px 28px -14px rgb(16 24 40 / 0.16)',
        lift: '0 2px 6px -2px rgb(16 24 40 / 0.06), 0 28px 56px -20px rgb(16 24 40 / 0.28)',
      },
      // Keyframes use the standalone `translate` property so they never
      // override Tailwind's `transform`-based hover lifts.
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', translate: '0 12px' },
          '100%': { opacity: '1', translate: '0 0' },
        },
        float: {
          '0%, 100%': { translate: '0 0' },
          '50%': { translate: '0 -7px' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
