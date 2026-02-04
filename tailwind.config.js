/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#EC4899", // Pink
                secondary: "#F9A8D4", // Light pink
                accent: "#8B5CF6", // Purple/Lavender
                background: "#FDF2F8", // Very light pink
                textPrimary: "#831843", // Dark pink
            },
            fontFamily: {
                heading: ["Lora", "serif"],
                body: ["Raleway", "sans-serif"],
            },
        },
    },
    plugins: [],
};
