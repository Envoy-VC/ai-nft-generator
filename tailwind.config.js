/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./sections/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	mode: 'jit',
	theme: {
		extend: {
			animation: {
				marquee_left: 'marquee_left 100s linear infinite',
				marquee_right: 'marquee_right 100s linear infinite',
			},
			keyframes: {
				marquee_left: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				marquee_right: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' },
				},
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				rubik: ['Rubik', 'sans-serif'],
			},
		},
	},
	plugins: [],
	darkMode: 'class',
};
