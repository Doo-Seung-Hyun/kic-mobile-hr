/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./**/*.{js,tx,jsx,tsx}"
  ],
  theme: {
    extend: {
        fontFamily: {
            'sans': ['Pretendard', '-apple-system', 'sans-serif']
        }
    },
  },
  plugins: [],
}

