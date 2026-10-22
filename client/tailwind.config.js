/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlack: '#0B0B0B',       // Header, footer, primary buttons[cite: 10]
        brandSoftBlack: '#1A1A1A',   // Hover states, cards[cite: 10]
        brandCharcoal: '#2B2B2B',    // Body text on light[cite: 10]
        brandGrey: '#6E6E6E',        // Secondary text, dividers[cite: 10]
        brandWarmIvory: '#F4F1EA',   // Alt section backgrounds[cite: 10]
        brandRed: '#C8102E',         // Sale accents, active nav[cite: 10]
        brandGold: '#C9A227',        // Badges, accents[cite: 10]
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
      sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}