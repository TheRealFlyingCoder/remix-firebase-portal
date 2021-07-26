const theme = require('./theme');
const CustomFonts = require('./fonts');
const CustomUtils = require('./utiltiies');

module.exports = {
	mode: 'jit',
	darkMode: 'media',
	purge: ['./app/**/*.{ts,tsx}'],
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), CustomFonts, CustomUtils],
	theme,
};
