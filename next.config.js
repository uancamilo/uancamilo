/** @type {import('next').NextConfig} */
module.exports = {
	env: {
		contenfulSpaceId: "6tvxy6letsti",
		contentfulAccessKey: "Or0cUC8v5hykZjGmsB-bqeFc_Z-yBOqzRlKppuH5Lr0",
	},
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
