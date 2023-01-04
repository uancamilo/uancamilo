const siteUrl = "https://uancamilo.vercel.app/";

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	robotsTxtOptions: {
		includeNonIndexSitemaps: false,
		policies: [
			{
				userAgent: "*",
				allow: "/",
			},
		],

	},
};