import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'


const config: Config = {
  darkMode: 'class', // This enables dark mode with the 'class' strategy
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'phone': { 'min': '320px', 'max': '767px' },
      'md': { 'min': '768px', 'max': '1023px' },
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        hackNF: ['var(--font-hackNF)', 'sans-serif'],
        rebondG: ['var(--font-Rebond)', 'san-serif']
      },
      fontSize: {
        'fluid-xs': 'var(--text-fluid-xs)',
        'fluid-sm': 'var(--text-fluid-sm)',
        'fluid-base': 'var(--text-fluid-base)',
        'fluid-lg': 'var(--text-fluid-lg)',
        'fluid-xl': 'var(--text-fluid-xl)',
        'fluid-2xl': 'var(--text-fluid-2xl)',
        'fluid-3xl': 'var(--text-fluid-3xl)',
        'fluid-4xl': 'var(--text-fluid-4xl)',
        'fluid-5xl': 'var(--text-fluid-5xl)',
      },
      colors: {
      }
    },
  },
  plugins: [
    tailwindcssAnimate,
    typography,
  ],
}

export default config
