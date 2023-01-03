
import { getServerSideSitemap } from "next-sitemap";
import { getAllPostsWithSlug } from "../../lib/api";

function generateSiteMap(allPosts) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
	 <url>
       <loc>https://uancamilo.vercel.app/</loc>
	   <priority>1.00</priority>
	   <changefreq>monthly</changefreq>
     </url>
     <url>
       <loc>https://uancamilo.vercel.app/perfil/</loc>
	   <priority>0.90</priority>
     </url>
     <url>
       <loc>https://uancamilo.vercel.app/contacto/</loc>
	   <priority>0.80</priority>
     </url>
     ${allPosts
				.map(({ slug }) => {
					return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/pagina/${slug}/`}</loc>
		   <lastmod>2023-01-03T03:36:19+00:00</lastmod>
		   <priority>0.80</priority>
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

export const getServerSideProps = async ({ res }) => {
	const request = await getAllPostsWithSlug();

	const sitemap = generateSiteMap(request);
	res.setHeader("Content-Type", "text/xml");
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: getServerSideSitemap(res),
	};
};

export default SiteMap;
