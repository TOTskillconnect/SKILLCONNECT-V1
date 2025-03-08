/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#880E4F',
          secondary: '#1D2939',
        },
        primary: {
          text: '#1D2939',
          DEFAULT: '#880E4F',
        },
        secondary: {
          text: '#1D2939',
          DEFAULT: '#1D2939',
        },
        background: '#FFFFFF',
        form: {
          background: '#F5F5F5',
          border: '#E5E7EB',
        },
        button: {
          gradient: {
            start: '#880E4F',
            end: '#880E4F',
          }
        },
        tag: {
          DEFAULT: '#E5E7EB',
        },
        card: {
          background: '#EEF5FF',
        },
        modal: {
          background: '#FFFFFF',
        },
        dropdown: {
          highlight: '#880E4F',
          hover: 'rgba(136, 14, 79, 0.1)',
        },
        status: {
          required: 'bg-[#880E4F] text-white',
          preferred: 'bg-[#880E4F] text-white',
          bonus: 'bg-[#880E4F] text-white',
        }
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      gridTemplateColumns: {
        'cards': 'repeat(auto-fill, minmax(320px, 1fr))',
      },
    },
  },
  plugins: [],
}; 