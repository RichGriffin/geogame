/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#111827',
        resultBg: '#1a1f2c',
        accent: '#4ADE80',
        accentText: '#052E16',
        guess: '#f87171',
        muted: '#94a3b8',
        mapBg: '#1e293b',
        mapLand: '#334155',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        accent: '0 10px 15px -3px rgba(74, 222, 128, 0.3), 0 4px 6px -4px rgba(74, 222, 128, 0.3)',
      },
    },
  },
  plugins: [],
};
