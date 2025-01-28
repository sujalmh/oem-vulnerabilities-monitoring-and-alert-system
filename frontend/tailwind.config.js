/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navColor: "#1f2937",
        darkNavColor: "#101824"
      },
    },
  },
  plugins: [],
};
