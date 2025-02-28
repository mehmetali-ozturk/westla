import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {      
      fontFamily: {
      sans: ['var(--font-poppins)'],
    },
      colors: {
        'lapd': {
          primary: '#012B6D',    // Navy blue
          secondary: '#FFBF00',  // Gold/Yellow
          button: '#FF7300',     // Gold/Yellow
          accent: '#2FA7EC',     // Light blue
          'primary-light': '#023894',
          'primary-dark': '#011d4a',
          'secondary-light': '#FFD040',
          'secondary-dark': '#CC9900',
          'accent-light': '#54B8F0',
          'accent-dark': '#1B8FD4',
          'danger': '#fc2003'
        }
      }
    }
  },
  plugins: [],
} satisfies Config;
