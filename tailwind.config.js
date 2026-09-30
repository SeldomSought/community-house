/** @type {import('tailwindcss').Config} */
module.exports = {
  // Every Tailwind utility in the MDX pages is written with this prefix
  // (tw-grid, md:tw-grid-cols-3 …). Without it none of them were generated.
  prefix: 'tw-',
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
        // Atlas palette — cobalt ink on laid paper (mirrors src/css/custom.css)
        brand: {
          DEFAULT: '#173A77',
          hover: '#0F2A5A',
          subtle: 'rgba(23, 58, 119, 0.06)',
        },
        surface: {
          DEFAULT: '#F3EEE3',
          elevated: '#F8F4EB',
          muted: '#EDE6D7',
          warm: '#EBE3D2',
          night: '#0E2146',
        },
        text: {
          DEFAULT: '#173A77',
          secondary: '#3F5480',
          muted: '#3F5480',
          inverse: '#F3EEE3',
        },
        border: {
          DEFAULT: 'rgba(23, 58, 119, 0.22)',
          strong: 'rgba(23, 58, 119, 0.55)',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Baskerville', 'Georgia', 'serif'],
        body: ['Cormorant Garamond', 'Baskerville', 'Georgia', 'serif'],
        ui: ['DM Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
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
        // square corners throughout — frames, not pills
        'sm': '0',
        'md': '0',
        'lg': '0',
        'xl': '0',
      },
      boxShadow: {
        // hairlines instead of shadows
        'sm': 'none',
        'md': 'none',
        'lg': 'none',
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
