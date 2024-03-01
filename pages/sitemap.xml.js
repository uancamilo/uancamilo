//pages/sitemap.xml.js

import { getEntriesWithSlug } from "../lib/contentful";

const EXTERNAL_DATA_URL = "https://uancamilo.vercel.app";

function generateSiteMap(estaticas) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://uancamilo.vercel.app/</loc>
     </url>
     <url>
       <loc>https://uancamilo.vercel.app/perfil</loc>
     </url>
     <url>
       <loc>https://uancamilo.vercel.app/contacto</loc>
     </url>
     ${estaticas
				.map(({ slug }) => {
					return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
       </url>
     `;
				})
				.join("")}
   </urlset>
 `;
}

function SiteMap() {
	// getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
	// We make an API call to gather the URLs for our site
	const request = await getEntriesWithSlug();

	// We generate the XML sitemap with the estaticas data
	const sitemap = generateSiteMap(request);

	res.setHeader("Content-Type", "text/xml");
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

export default SiteMap;
