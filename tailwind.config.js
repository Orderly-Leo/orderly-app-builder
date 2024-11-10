/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        editor: {
          bg: '#1E1E1E',
          sidebar: '#252526',
          border: '#333333',
        }
      }
    },
  },
  plugins: [],
} 