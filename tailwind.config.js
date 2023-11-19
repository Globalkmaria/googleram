/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "google-blue": "#4285F4",
        "google-red": "#DB4437",
        "google-yellow": "#F4B400",
        "google-green": "#0F9D58",
      },
      backgroundImage: {
        "google-gradient":
          "linear-gradient(0.25turn,#4285F4,#DB4437,#F4B400,#0F9D58)",
      },
    },
  },
  plugins: [],
};
