/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/config/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        rain: {
          '0%': { opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)' },
        },
        rotation: {
          '0%': {
            transform: 'rotate(0)'
          },
          '20%': {
            transform: 'rotate(4deg)'
          },
          '80%': {
            transform: 'rotate(-4deg)'
          },
          '100%': {
            transform: 'rotate(0)'
          },
        }
      },
      animation: {
        rain: 'rain 1000ms infinite ease-out',
        rotation: 'rotation infinite 3s',
        appear: 'appear 3s normal forwards',
      }
    },
  },
  plugins: [],
}

