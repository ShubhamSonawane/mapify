import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "wave-bounce-1": {
          "0%, 100%": { transform: "scaleY(0.5)" },
          "50%": { transform: "scaleY(1.3)" },
        },
        "wave-bounce-2": {
          "0%, 100%": { transform: "scaleY(0.6)" },
          "40%": { transform: "scaleY(1.4)" },
          "80%": { transform: "scaleY(0.8)" },
        },
        "wave-bounce-3": {
          "0%, 100%": { transform: "scaleY(0.7)" },
          "30%": { transform: "scaleY(1.35)" },
          "70%": { transform: "scaleY(0.9)" },
        },
        "wave-bounce-4": {
          "0%, 100%": { transform: "scaleY(0.55)" },
          "60%": { transform: "scaleY(1.2)" },
        },
      },
      animation: {
        "wave-bounce-1": "wave-bounce-1 1.1s ease-in-out infinite",
        "wave-bounce-2": "wave-bounce-2 0.95s ease-in-out infinite",
        "wave-bounce-3": "wave-bounce-3 1.25s ease-in-out infinite",
        "wave-bounce-4": "wave-bounce-4 1.05s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
