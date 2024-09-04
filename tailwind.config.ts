import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'phone': { 'min': '350px', 'max': '767px' },
      'md': { 'min': '768px', 'max': '1023px' },
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    typography,
  ],
}

export default config
