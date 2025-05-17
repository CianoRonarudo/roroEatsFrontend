// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        
        'orange-primary' : '#f26af2',
        'green-primary' : '#77b255',
        'brown-primary' : '#3E2C24',
        'white-primary' : '#FAF8F5',
        'gray-primary' : '#2F2F2F',
        'red-secondary' : '#FF4D4D',
        'yellow-secondary' : '#ffc542',
        'green-secondary' : '#A0E49F',
        'gray-secondary' : '#E0E0E0',
        'orange-tertiary' : '#d85b15', 

      },
    },
  },
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  plugins: [],
}
