import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {

      center: true,
      padding: "2rem",
      screens: {
        'phone': { 'min': '350px', 'max': '767px' },
        'sm': '640px',
        'md': { 'min': '768px', 'max': '1023px' },
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },

    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
      },
      fontFamily: {
        mono: ['var(--font-roboto-mono)'],
      }

    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config

export default config