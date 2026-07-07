/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0b1120', 
        cardBg: '#1e293b', 
        primary: '#3b82f6', 
        primaryHover: '#2563eb', 
        textMain: '#f8fafc', 
        textMuted: '#94a3b8', 
      }
    },
  },
  plugins: [],
}