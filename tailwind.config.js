/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // Disable Tailwind's reset to avoid conflicts with Docusaurus
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './docs/**/*.{md,mdx}',
    './blog/**/*.{md,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Editorial color palette - warm stone tones
        brand: {
          DEFAULT: '#D4642A',
          hover: '#B85420',
          subtle: 'rgba(212, 100, 42, 0.08)',
        },
        surface: {
          DEFAULT: '#FAFAF8',
          elevated: '#FFFFFF',
          muted: '#F5F4F1',
          warm: '#F0EDE8',
        },
        text: {
          DEFAULT: '#2D2D2A',
          secondary: '#5C5C57',
          muted: '#8A8A85',
          inverse: '#FAFAF8',
        },
        border: {
          DEFAULT: 'rgba(45, 45, 42, 0.1)',
          strong: 'rgba(45, 45, 42, 0.2)',
        },
      },
      fontFamily: {
        heading: ['Source Serif 4', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        // Editorial type scale
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      spacing: {
        // 8px base unit spacing scale
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.5rem',
        '6': '2rem',
        '8': '3rem',
        '10': '4rem',
        '12': '5rem',
        '16': '6rem',
        '20': '8rem',
      },
      maxWidth: {
        'narrow': '38rem',
        'medium': '48rem',
        'wide': '72rem',
        'max': '80rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(45, 45, 42, 0.04)',
        'md': '0 4px 12px rgba(45, 45, 42, 0.06)',
        'lg': '0 8px 24px rgba(45, 45, 42, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
