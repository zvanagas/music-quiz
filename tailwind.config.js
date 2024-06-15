/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rain: {
          '0%': { opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      animation: {
        rain: 'rain 1000ms infinite ease-out',
      }
    },
  },
  plugins: [],
}

