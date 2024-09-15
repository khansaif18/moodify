/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-bg': '#f5f5f5',
      },
      backgroundImage: {
        'custom-grid': 'linear-gradient(to right, rgba(0, 0, 0, 0.2) 2px, transparent 2px), linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 2px, transparent 2px)',
      },
      backgroundSize: {
        'grid-size': '40px 40px', // Larger grid size
      },
    },
  },
  plugins: [],
};
