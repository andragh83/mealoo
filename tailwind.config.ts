import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        righteous: "var(--righteous-font)",
        raleway: "var(--raleway-font)",
        raleway_light: "var(--raleway-light-font)",
        raleway_semibold: "var(--raleway-semibold-font)",
      },
      colors: {
        breakfast: "#FEFFCC",
        lunch: "#FFEFD8",
        dinner: "#F1FFE6",
        primary: "#E6F6C3",
        pastel_teal: "#DEFFE2",
      },
    },
  },
  plugins: [],
};
export default config;
