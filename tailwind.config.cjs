/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,md,mdx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#E1F9E9',
                    100: '#BFF3D0',
                    200: '#83E8A4',
                    300: '#42DB75',
                    400: '#22B453',
                    500: '#167535',
                    600: '#125E2B',
                    700: '#0D4520',
                    800: '#092F16',
                    900: '#04150A',
                    950: '#020D06',
                },
            },
            scale: {
                push: '0.98',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/container-queries'),
    ],
};
