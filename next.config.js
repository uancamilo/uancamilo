/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		loader: "default",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.ctfassets.net",
			},
		],
	},
};
