import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B1C1C',
          dark: '#4A0E0E',
          light: '#8B2E2E',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E5C35A',
          dark: '#A88215',
          pale: '#F5E9C0',
        },
        saffron: {
          DEFAULT: '#E65100',
          light: '#FF6D00',
          pale: '#FFF3E0',
        },
        ivory: {
          DEFAULT: '#FFF9F0',
          dark: '#F5EDD8',
        },
        cream: '#F5EDD8',
        'warm-brown': '#5C3317',
        'text-dark': '#1A1A1A',
        'text-muted': '#6B6B6B',
        burgundy: {
          DEFAULT: '#6B1C1C',
          50: '#FDF5F5',
          100: '#FAE8E8',
          200: '#F3CACA',
          300: '#E9A0A0',
          400: '#D96B6B',
          500: '#C44444',
          600: '#A83030',
          700: '#8B2020',
          800: '#6B1C1C',
          900: '#4A0E0E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'Poppins', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #E5C35A 50%, #A88215 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #4A0E0E 0%, #6B1C1C 50%, #8B2E2E 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #FFF9F0 0%, #F5EDD8 100%)',
        'hero-overlay':
          'linear-gradient(to bottom, rgba(30,5,5,0.65) 0%, rgba(30,5,5,0.75) 100%)',
        'card-shine':
          'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 8px rgba(201,162,39,0.3)',
        gold: '0 4px 20px rgba(201,162,39,0.4)',
        'gold-lg': '0 8px 40px rgba(201,162,39,0.5)',
        'primary-sm': '0 2px 8px rgba(107,28,28,0.2)',
        primary: '0 4px 20px rgba(107,28,28,0.3)',
        'primary-lg': '0 8px 40px rgba(107,28,28,0.4)',
        glass: '0 8px 32px rgba(0,0,0,0.1)',
        'card-hover': '0 20px 60px rgba(107,28,28,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        float: 'float 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,162,39,0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(201,162,39,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        glow: {
          from: { textShadow: '0 0 10px rgba(201,162,39,0.5)' },
          to: { textShadow: '0 0 20px rgba(201,162,39,0.8), 0 0 40px rgba(201,162,39,0.3)' },
        },
      },
      screens: {
        xs: '375px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [typography],
};

export default config;
