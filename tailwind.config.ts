import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
      colors: {
        primary: "#12A150",
        backgroundColor: "#0D001A",
      },
    },
  },
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      layout: {},
      themes: {
        // CustomeTheme
        dark: {
          extend: "dark",
          colors: {
            default: "#17C964",
            background: "#0D001A",
            foreground: "#ffffff",
            primary: {
              50: "#E8FAF0",
              100: "#D1F4E0",
              200: "#A2E9C1",
              300: "#74DFA2",
              400: "#45D483",
              500: "#17C964",
              600: "#12A150",
              700: "#0E793C",
              800: "#095028",
              900: "#052814",
              DEFAULT: "#17C964",
              foreground: "#ffffff",
            },
            focus: "#12A150",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "8px",
              medium: "10px",
              large: "12px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },

        light: {
          extend: "light",
          colors: {
            foreground: "dark",
            primary: {
              50: "#E8FAF0",
              100: "#D1F4E0",
              200: "#A2E9C1",
              300: "#74DFA2",
              400: "#45D483",
              500: "#17C964",
              600: "#12A150",
              700: "#0E793C",
              800: "#095028",
              900: "#052814",
              DEFAULT: "#17C964",
              foreground: "dark",
            },
            focus: "#12A150",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "8px",
              medium: "10px",
              large: "12px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
export default config;
