const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './_site/**/*.html',
    
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
      gridTemplateRows: {
        // Simple 8 row grid
       '8': 'repeat(8, minmax(0, 1fr))',

        // Complex site-specific row configuration
       'layout': 'auto 1fr',

       'speaker-md': '1.5rem auto 1fr auto 1.5rem',

       'schedule': 'repeat(6, 1fr)',

      },
      gridTemplateColumns: {
        'speaker-md': '2fr 1fr',
        'speaker': '1.5fr 0.5fr 1fr'
      }
    },
    colors: {
      yellow: colors.amber,
      black: colors.black,
      white: colors.white,
      blue: colors.blue,
      gray: colors.coolGray
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