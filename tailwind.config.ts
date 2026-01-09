import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'


const config: Config = {
  darkMode: 'class',
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
        sans: ['var(--font-Rebond)', 'system-ui', 'sans-serif'],
        hackNF: ['var(--font-hackNF)', 'monospace'],
        rebondG: ['var(--font-Rebond)', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['var(--font-hackNF)', 'ui-monospace', 'monospace'],
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
        'fluid-6xl': 'var(--text-fluid-6xl)',
        'fluid-7xl': 'var(--text-fluid-7xl)',
      },
      letterSpacing: {
        'widest': '0.2em',
        'wider': '0.1em',
        'wide': '0.05em',
        'document': '0.15em',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Atlas-style accent colors
        cyan: {
          DEFAULT: 'hsl(var(--accent-cyan))',
          foreground: 'hsl(var(--accent-cyan-foreground))',
        },
        coral: {
          DEFAULT: 'hsl(var(--accent-coral))',
          foreground: 'hsl(var(--accent-coral-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-left': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-right': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'blur-in': {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'fade-down': 'fade-down 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'fade-left': 'fade-left 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'fade-right': 'fade-right 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'blur-in': 'blur-in 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'slide-down': 'slide-down 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    typography,
  ],
}

export default config
