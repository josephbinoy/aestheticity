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
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0',
      'full': '9999px',
      'large': '12px',
  },
    extend: {}
  },
  plugins: [require('flowbite/plugin')],
}
