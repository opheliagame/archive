const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.njk',
    './src/**/*.mjs',
    './src/**/*.html',
  ],
  theme: {
    colors: {
      pink: colors.pink,
      green: colors.green,
      lime: colors.lime
    },
    fontSize: {
      'xxs': '.50rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      zIndex: {
        '-10': '-10',
      },
      fontFamily: {
        sans: ["'Poppins'", 'sans-serif']
      },
      backgroundPosition: {
        'left-bottom': 'left bottom -0.75rem',
      }
    },
    animation: {
      'spin-slow': 'spin 8s linear infinite',
      'flutter': 'flutter 3s ease-in-out infinite'
    },
    keyframes: {
      flutter: {
        '0%, 100%': { transform: 'skew(0deg, -15deg)' },
        '50%': { transform: 'skew(0deg, 15deg)' },
      },
      spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform:'rotate(360deg)' }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}