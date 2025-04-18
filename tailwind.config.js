/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ryd: {
          primary: '#AA468F',
          primaryLess1: '#F3ECFF',
          headerTextPrimary: '#001731',
          subTextPrimary: '#041D34',
          subTextSecondary: '#476788',
          subTextSecondary1: '#0B3558',
          borderColor: '#47678842',
          gray: '#F7F7F7',
          green: '#3DBE29'
        }
      }
    },
  },
  plugins: [],
}

