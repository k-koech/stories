/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./src/**/*.{js,jsx,ts,tsx}", "./index.html",

],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
]
}

