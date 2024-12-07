module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        typingForsa: 'typingForsa 2s steps(5) 1s forwards', // Forsa: 5 lettres
        typingMarket: 'typingMarket 2s steps(6) 1s forwards', // Market: 6 lettres
      },
      keyframes: {
        typingForsa: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        typingMarket: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        colors: {
          'custom-pink': '#f68E93',
          'custom-blue': '#6adbd5',
          'custom-beige': '#FCF3EC',
        },
      },
    },
  },
  plugins: [],
}
