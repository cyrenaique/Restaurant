import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf8f0",
          100: "#f9eddb",
          200: "#f2d7b0",
          300: "#e9bc7e",
          400: "#df9a4a",
          500: "#d6822e",
          600: "#c86a23",
          700: "#a65120",
          800: "#854221",
          900: "#6c371e",
          950: "#3a1b0e",
        },
        wine: {
          50: "#fdf2f4",
          100: "#fce7eb",
          200: "#f9d0da",
          300: "#f4aabb",
          400: "#ec7a96",
          500: "#df4f74",
          600: "#cb2d5d",
          700: "#ab204c",
          800: "#8f1d43",
          900: "#7a1c3e",
          950: "#440a1e",
        },
        sea: {
          50: "#f0f7fa",
          100: "#d9ecf3",
          200: "#b8dce9",
          300: "#87c4d8",
          400: "#4fa5c0",
          500: "#3489a6",
          600: "#2d6f8c",
          700: "#2a5b73",
          800: "#294d60",
          900: "#264152",
          950: "#152937",
        },
        sand: {
          50: "#fdfaf5",
          100: "#f8f0e3",
          200: "#f0dfc4",
          300: "#e5c89d",
          400: "#d9ab73",
        },
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "'Times New Roman'", "serif"],
        body: ["system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
