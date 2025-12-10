// .babelrc.js - Configuración de Babel para Jest

module.exports = {
	presets: [
		[
			"next/babel",
			{
				"preset-env": {
					targets: {
						node: "current",
					},
				},
			},
		],
	],
	plugins: [],
	env: {
		test: {
			presets: [
				[
					"next/babel",
					{
						"preset-env": {
							targets: {
								node: "current",
							},
						},
					},
				],
			],
		},
	},
};
