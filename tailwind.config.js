/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.8rem',
        'sm': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
        '2xl': '6rem',
      },
    },
    extend: {
      boxShadow: {
        'custom-inner': '0px 3px 4px 0px #00000040 inset',
        'custom': '14px 14px 42px 7px #0202461F;',
        'redshadow': '0px 0px 25.6px 0px #FF2D4640',
        'innershadow1': '0 0 15px 0 #0000001f',
        'yellowshadow': '0 0 48.5px 0 #ffd54933',
        'goldenshadow': '0px 0px 15px 0px #FFD549E5',
        'buttonshadow': '0px 0px 12px 0px #FF2D46,0px 0px 10px 0px #FFFFFF80 inset',
        'buttonshadowBlue': '0px 0px 12px 0px #006ac9,0px 0px 10px 0px #FFFFFF80 inset',
        'hovershadow': '0px 0px 24px 0px #1D1D1F33'


      },
      content: {
        'tickMark': 'url("/blog/right_mark.svg")',
      },
      backgroundImage: {
        'black-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0.35%, #252B42 73.33%)',
      },
      dropShadow: {
        'fireshadow': '0px 0px 25px 0px #ED5E1659',
        'whiteshadow': '0 0 6px #fff',
        'bannershadow': '0 0 37px #ffffff',
        'textshadow': '0 0 10px #FFFFFF'

      },
      colors: {
        pte: "#027FA2",
        ielts: "#FF2D46",
        ptelight: '#027FA21A',
        ieltslight: '#FF2D461A',
        "ws-primary-500": "#E27A34",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#006ac9",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      ringColor: {
        'ws-primary': '#E27A34', // Custom ring color
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'shadow-customred': {
          from: { boxShadow: '0px 0px 50.83px 0px #FF2D468C' },
          to: { boxShadow: '0px 0px 40px 0px #FF2D468C' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'infinite-scroll': 'infinite-scroll 10s linear infinite',
        'shadow-customred': 'shadow-customred 2s ease-in-out linear infinite'
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
}