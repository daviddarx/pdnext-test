/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        gutter: 'var(--gutter)',
        'gutter-1/3': 'calc(var(--gutter) * 0.3)',
        'gutter-1/2': 'calc(var(--gutter) * 0.5)',
        'gutter-2': 'calc(var(--gutter) * 2)',
        'gutter-4': 'calc(var(--gutter) * 4)',
      },
    },
  },
  plugins: [],
};
