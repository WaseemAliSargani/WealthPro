module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '0.2rem',
      },
    },
    fontFamily: {
    },
    extend: {
      colors: {
        darkblue: {
          DEFAULT: '',
          secondary: '#252540',
        },
        blue: {
          DEFAULT: '#3671E9',
          hover: '#2766E6',
        },
        gray: {
          DEFAULT: '#E0E0E0',
        },
        violet: '#2B076E',
        white: '#ffffff',
        primary: 'text-[#efc99d]',
      },
      boxShadow: {
        primary: '0px 20px 200px rgba(57, 23, 119, 0.05)',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
  },
  plugins: [],
};
