import { designTokens } from './src/design-system/tokens.data.js'

const { colors, spacing, typography, borderRadius, shadows, animation, breakpoints, zIndex } = designTokens

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        neutral: colors.neutral,
        accent: colors.accent,
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        error: colors.semantic.error,
        info: colors.semantic.info,
      },
      spacing: {
        ...spacing,
        18: '4.5rem',
        88: '22rem',
        120: '30rem',
      },
      fontFamily: {
        sans: typography.fontFamily.sans,
        hebrew: typography.fontFamily.hebrew,
      },
      fontSize: typography.fontSize,
      borderRadius: {
        ...borderRadius,
      },
      boxShadow: {
        ...shadows,
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'fade-out': 'fadeOut 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionDuration: {
        ...animation.duration,
        400: '400ms',
        600: '600ms',
      },
      transitionTimingFunction: {
        ...animation.easing,
      },
      zIndex: {
        ...zIndex,
      },
    },
    screens: breakpoints,
  },
  plugins: [],
}
