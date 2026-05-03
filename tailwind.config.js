/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a', // deep blue
          blue: '#1e3a8a',
          primary: '#2563eb',
          light: '#eff6ff',
          gray: '#f8fafc',
        }
      }
    },
  },
  plugins: [],
}
