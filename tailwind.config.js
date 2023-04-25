/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        //? Aplicar los colores como JSON:
        colors: {
            // primary: "#EE6C4D", //? Color Orange primario que se va a ocupar en casi todo.
            primary: "#BDEB00", //? Color Verde Fosforesente primario que se va a ocupar en casi todo.
            secundary: {
                100: "#1E1F25", //? Color Sidebar.
                900: "#131517", //? Color Fondo.
            },
        },
    },
  },
  plugins: [],
}

