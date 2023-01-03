const siteUrl = "https://uancamilo.vercel.app/";

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [{ userAgent: "*", allow: "/" }],
		additionalSitemaps: [
			`${siteUrl}/server-sitemap.xml/`,
			`${siteUrl}/server-0.xml/`,
		],
	},
};
