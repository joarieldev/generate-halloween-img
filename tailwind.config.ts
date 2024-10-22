import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        parpadeo: 'parpadeo 2s infinite ease-in-out',
        shine: 'shine 5s linear infinite',
      },
      keyframes: {
        parpadeo: {
          '0%, 100%': { filter: 'brightness(0.9)', opacity: '0.95' },
          '50%': { filter: 'brightness(1.3)', opacity: '0.9' },
        },
        shine: {
          from: {
            backgroundPosition: '-200% 0',
          },
          to: {
            backgroundPosition: '0 0',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
