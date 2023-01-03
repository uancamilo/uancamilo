import { getAllPostsWithSlug } from "../../lib/api";

const EXTERNAL_DATA_URL = "https://uancamilo.vercel.app";

function generateSiteMap(allPosts) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://uancamilo.vercel.app/perfil</loc>
     </url>
     <url>
       <loc>https://uancamilo.vercel.app/contacto</loc>
     </url>
     ${allPosts
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
	const request = await getAllPostsWithSlug();

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
