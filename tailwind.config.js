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
        'gutter-3': 'calc(var(--gutter) * 3)',
        'gutter-4': 'calc(var(--gutter) * 4)',
      },
      transitionTimingFunction: {
        // Easing functions from the Penner library
        'in-quad': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
        'in-cubic': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        'in-quart': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
        'in-quint': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
        'in-sine': 'cubic-bezier(0.47, 0.0, 0.745, 0.715)',
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'in-circ': 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
        'in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',

        'out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1.0)',
        'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1.0)',
        'out-quint': 'cubic-bezier(0.23, 1.0, 0.32, 1.0)',
        'out-sine': 'cubic-bezier(0.39, 0.575, 0.565, 1.0)',
        'out-expo': 'cubic-bezier(0.19, 1.0, 0.22, 1.0)',
        'out-circ': 'cubic-bezier(0.075, 0.82, 0.165, 1.0)',
        'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

        'in-out-quad': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        'in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1.0)',
        'in-out-quart': 'cubic-bezier(0.77, 0.0, 0.175, 1.0)',
        'in-out-quint': 'cubic-bezier(0.86, 0.0, 0.07, 1.0)',
        'in-out-sine': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
        'in-out-expo': 'cubic-bezier(1.0, 0.0, 0.0, 1.0)',
        'in-out-circ': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
        'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
};
