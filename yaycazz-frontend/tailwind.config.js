/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',

  ],
  theme: {
    extend: {},
  },
  "daisyui": {
    "themes": ["dark"],
  },
  plugins: [
    require("daisyui"),
    require('preline/plugin'),
  ],
}

