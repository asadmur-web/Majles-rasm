/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,tsx,jsx}",
    "./src/components/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        'neon-blue': '#00D4FF',
        'dark-slate': '#1a1a2e',
        'charcoal': '#16213e',
      },
    },
  },
  plugins: [],
}
