const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    // './src/**/*.njk',
    './src/**/*.mjs',
    // './src/**/*.html',
    './_site/**/*.html'
  ],
  theme: {
    colors: {
      pink: colors.pink,
      green: colors.green,
      lime: colors.lime
    },
    extend: {
      fontSize: {
        'xxs': '.50rem',
      },
      zIndex: {
        '-10': '-10',
      },
      fontFamily: {
        sans: ["'Poppins'", 'sans-serif']
      },
      backgroundPosition: {
        'left-bottom': 'left bottom -0.75rem',
      },
      fontFamily: {
        'hindi': ['Rajdhani', 'sans-serif'],
      }
    },
    animation: {
      'spin-slow': 'spin 8s linear infinite',
      'flutter': 'flutter 3s ease-in-out infinite',
      'expand': 'expand 5s linear infinite'
    },
    keyframes: {
      flutter: {
        '0%, 100%': { transform: 'skew(0deg, -15deg)' },
        '50%': { transform: 'skew(0deg, 15deg)' },
      },
      spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform:'rotate(360deg)' }
      },
      expand: {
        '0%, 100%': { transform: 'translateX(0%)' },
        '50%': { transform:'translateX(-100%)' }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}