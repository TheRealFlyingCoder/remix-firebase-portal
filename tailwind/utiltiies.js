const plugin = require('tailwindcss/plugin');

//This is me trying ways to keep CSS out of my life.
//It looks a bit messy at first but you learn to love it's simplicity :)
module.exports = plugin(function ({ addUtilities, theme }) {
	addUtilities({
		'a, button': {
			'@apply text-base rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand': {}
		},
		'a': { 
			'@apply font-medium text-brand hover:text-brand/80': {} 
		},
		'a.button, button': {
			'@apply flex justify-center items-center py-2 px-4 md:py-4 md:text-lg md:px-10 border text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand': {}
		},
		'a.button.small, button.small': {
			'@apply md:py-2 md:px-4 md:text-base': {}
		},
		'.transparent': {
			'@apply bg-transparent border-none text-white hover:text-gray-100': {}
		},
		'.outline': {
			'@apply bg-transparent border-white text-white hover:bg-white/20 hover:text-white': {}
		},
		'.white': {
			'@apply bg-white border-white text-brand hover:bg-white/80 hover:border-brand': {}
		},
		'.primary': {
			'@apply bg-brand border-brand text-white hover:bg-brand/80 hover:text-white': {}
		},
		'.secondary': {
			'@apply bg-transparent border-white text-white hover:bg-white/20 hover:text-white': {}
		},
	});
});
