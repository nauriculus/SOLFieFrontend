const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },

    extend: {
      colors: {
        black: "#030303",
        background: "#141414",
        orange: "#f89706",
        dark: "#070202",
        green: "#008000",
        red: "#ce0f01",
        gm: "#030303",
        teal: "#4df3fb",
        grey: "#2d2b27",
        white: "#ffffff",
      },

      spacing: {
        7.5: "1.875rem",
      },
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        slideRight: {
          "from, to": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-200%)" },
        },
      },
      animation: {
        "slide-right": "slideRight 10s linear infinite",
      },

         borderWidth: {
        1: "1px",
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-out': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(10px)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'fade-out': 'fade-out 0.3s ease-in-out',
        'slide-in': 'slide-in 0.3s ease-in-out',
        'slide-out': 'slide-out 0.3s ease-in-out',
      },

      backgroundImage: {
        "dark-gradient": "linear-gradient(135deg, #070302, #ac1004, #f89003)",
        "purple-pink-gradient": "linear-gradient(135deg, #5c2be2, #9747ff)",
      },
      boxShadow: {
        xs: "0px 0px 22px 0px #a4ffff",
        sm: "0px 0px 24px 0px #a4ffff",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
