import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      lineHeight: {
        "19": "1.188rem",
      },
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.938rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.5rem",
    },
    colors: {
      primaryPurple: "#635FC7",
      lightPurple: "#A8A4FF",
      black: "#000112",
      white: "#FFFFFF",
      backgroundDark: "#20212C",
      secondaryDark: "#2B2C37",
      accentDark: "#3E3F4E",
      textMuted: "#828FA3",
      textLight: "#E4EBFA",
      backgroundLight: "#F4F7FD",
      errorRed: "#EA5555",
      warningRed: "FF9898",
    },
  },
  plugins: [],
};
export default config;
