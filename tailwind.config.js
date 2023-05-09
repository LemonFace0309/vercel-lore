/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      animation: {
        // fadeIn: 'fadeIn 1s ease-in-out',
        fadeIn: '1s ease-in-out 2.4s fade',
      },

      // that is actual animation
      keyframes: () => ({
        fade: {
          from: { opacity: 0, display: 'none' },
          to: { opacity: 100, display: 'flex' },
        },
      }),
    },
  },
  plugins: [],
}
