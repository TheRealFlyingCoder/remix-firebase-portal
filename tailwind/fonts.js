const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addBase, theme }) {
	addBase([
		{
			'@font-face': {
				fontFamily: 'Belfast-Medium',
				src: "url('/fonts/belfast-grotesk-medium.woff2') format('woff2'), url('/fonts/belfast-grotesk-medium.woff') format('woff')",
				['font-display']: 'swap'
			},	
		},
		{
			'@font-face': {
				fontFamily: 'Belfast-Regular',
				src: "url('/fonts/belfast-grotesk-regular.woff2') format('woff2'), url('/fonts/belfast-grotesk-regular.woff') format('woff')",
				['font-display']: 'swap'
			},
		},
		{
			'@font-face': {
				fontFamily: 'Belfast-Semi',
				src: "url('/fonts/belfast-grotesk-semibold.woff2') format('woff2'), url('/fonts/belfast-grotesk-semibold.woff') format('woff')",
				['font-display']: 'swap'
			},
		},
		{
			'@font-face': {
				fontFamily: 'Belfast-Bold',
				src: "url('/fonts/belfast-grotesk-bold.woff2') format('woff2'), url('/fonts/belfast-grotesk-bold.woff') format('woff')",
				['font-display']: 'swap'
			},
		},
		{
			'@font-face': {
				fontFamily: 'Belfast-Extra',
				src: "url('/fonts/belfast-grotesk-extrabold.woff2') format('woff2'), url('/fonts/belfast-grotesk-extrabold.woff') format('woff')",
				['font-display']: 'swap'
			},
		}
	]);

	addBase({	
		'h1': { fontSize: theme('fontSize.3xl'), fontFamily: theme('fontFamily.extra'), textColor: theme('colors.gray.900') },
		'h2': { fontSize: theme('fontSize.2xl'), fontFamily: theme('fontFamily.bold'), textColor: theme('colors.gray.900')  },
		'h3': { fontSize: theme('fontSize.xl'), fontFamily: theme('fontFamily.bold') },
	})
});