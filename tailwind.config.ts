import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";
import { green } from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|autocomplete|badge|button|card|date-picker|dropdown|input|modal|pagination|select|spinner|toggle|table|popover|divider|ripple|listbox|scroll-shadow|calendar|date-input|menu|checkbox|spacer).js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            // primary: "#0070f3",
            primary: green[700],
          },
        },
      },
    }),
  ],
};
export default config;
