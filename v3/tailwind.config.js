/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          black: '#050508',
          darker: '#0a0a0f',
          dark: '#0f0f14',
          muted: '#1a1a22',
        },
        rose: {
          soft: '#e8b4c8',
          muted: '#d4a0b8',
          deep: '#c48b9f',
        },
        nebula: {
          purple: '#4a3a5c',
          deep: '#2d2438',
          light: '#6b5a7d',
        },
        star: {
          white: '#f5f0f8',
          dim: '#c9c4d0',
          muted: '#8a8690',
        },
        cream: {
          50: '#fdfcf8',
          100: '#f5f1e8',
          200: '#ebe4d6',
          300: '#ddd4c0',
        },
        earth: {
          900: '#0f0c09',
          800: '#1a1410',
          700: '#2a211a',
          600: '#3d2f26',
        },
        rust: {
          400: '#e87d54',
          500: '#d4653b',
          600: '#b3502e',
        },
        gold: {
          300: '#e8d5a3',
          400: '#d4b896',
          500: '#c9a959',
        },
        ink: {
          light: '#8b7e6a',
          DEFAULT: '#4a3f35',
          dark: '#1a1410',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        }
      },
    },
  },
  plugins: [],
}
