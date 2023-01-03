const siteUrl = "https://uancamilo.vercel.app/";

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [{ userAgent: "*", allow: "/" }],
		additionalSitemaps: [`${siteUrl}/sitemap-0.xml/`],
		
	},
};
