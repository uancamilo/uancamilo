import { getEntriesWithSlug } from "../lib/contentful";

const EXTERNAL_DATA_URL = "https://uancamilo.vercel.app/recursos";

export default function generateSiteMap(recursos) {
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://uancamilo.vercel.app/</loc>
    <priority>0.8</priority>
    <lastmod>2024-03-01</lastmod>
  </url>
  <url>
    <loc>https://uancamilo.vercel.app/recursos</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://uancamilo.vercel.app/contacto</loc>
    <priority>0.7</priority>
  </url>
  ${recursos
		.map((entry) => {
			const slug = entry.fields?.slug ?? entry.slug ?? "sin-slug";
			const lastmod = entry.sys?.updatedAt
				? new Date(entry.sys.updatedAt).toISOString()
				: new Date().toISOString();

			return `<url>
    <loc>${EXTERNAL_DATA_URL}/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.6</priority>
    <changefreq>monthly</changefreq>
  </url>`;
		})
		.join("\n")}
</urlset>`;
}

function SiteMap() {
	return null;
}

export async function getServerSideProps({ res }) {
	const request = await getEntriesWithSlug();
	const sitemap = generateSiteMap(request);

	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}
