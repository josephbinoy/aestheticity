/** @type {import('tailwindcss').Config} */
module.exports ={
  content: ['./node_modules/flowbite-react/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {      
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0',
      'full': '9999px',
      'large': '12px',
  },
  fontWeight: {
    thin: '100',
    hairline: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    'extra-bold': '800',
    black: '900',
  },
    extend: {}
  },
  plugins: [require('flowbite/plugin')],
}
