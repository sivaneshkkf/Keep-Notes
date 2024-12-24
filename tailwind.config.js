/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : "#4F55C4",
        secondary : "#F2915A",
        primaryDark: "#3E44B3",
        bg : "#ECEDFF",
        text : "#333333" 
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
    },
  },
  plugins: [],
}

