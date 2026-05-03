/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: '#070807',
        charcoal: '#11130f',
        cream: '#f1efe6',
        bone: '#fbfaf4',
        olive: {
          300: '#c9b66b',
          400: '#a69645',
          500: '#8a7a2f',
          600: '#5f5525',
          700: '#312d14'
        },
        muted: '#767b72'
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 18px 50px rgba(138, 122, 47, 0.22)',
        lift: '0 22px 60px rgba(0, 0, 0, 0.22)'
      },
      letterSpacing: {
        brand: '0.11em',
        button: '0.12em'
      },
      maxWidth: {
        page: '1180px'
      }
    }
  },
  plugins: []
};
