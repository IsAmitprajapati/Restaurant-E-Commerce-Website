/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width : {
        150 : "150px",
        190 : "190px",
        225 : "225px",
        275 : "275px",
        300 : "300px",
        340 : "340px",
        350 : "350px",
        375 : "375px",
        460 : "460px",
        656 : "656px",
        880 : "880px",
        508 : "508px",
      },
      height : {
        80 : "80px",
        150 : "150px",
        225 : "225px",
        300 : "300px",
        340 : "340px",
        370 : "370px",
        420 : "420px",
        510 : "510px",
        600 : "600px",
        685 : "685px",
        800 : "800px",
        "90vh" : "90vh",
      },
      minWidth : {
        210 : "210px",
        350 : "350px",
        620 : "620px",
      },
      screens : {
        sm : "640px",
        md : "768px",
        lg : "1024px",
        xl : "1280px",
        "2xl" : "1536px",
      },
      colors : {
        headingColor : "#000",
        textColor : "#515151",
        cartNumBg : "#dddddd",
        primary : "#f5f3f3",

        textNavColor : "#fefefe",
        textNavHoverColor : "#ffffff",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
