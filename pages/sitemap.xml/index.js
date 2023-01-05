import { getServerSideSitemap } from "next-sitemap";
import { getAllPostsWithSlug } from "../../lib/api";

export async function getServerSideProps(context) {
	//fetch urls desde la api de contenful con graphql
	const urls = await getAllPostsWithSlug();

	//paginas estaticas ingresadas manualmente

	const principales = [
		{
			loc: "https://uancamilo.vercel.app/",
			lastmod: "2023-01-02",
			changefreq: "monthly",
			priority: "1.0",
		},
		{
			loc: "https://uancamilo.vercel.app/contacto",
			lastmod: "2023-01-02",
			changefreq: "monthly",
			priority: "0.9",
		},
	];

	console.log(urls);

	const fields = urls?.map((url) => ({
		loc: `https://uancamilo.vercel.app/pagina/${url.slug}`,
		lastmod: new Date(`${url.date}`).toISOString().split("T")[0],
		changefreq: "monthly",
		priority: "0.8",
	}));

	principales.push(...fields);

	console.log(principales);

	return getServerSideSitemap(context, principales);
}

export default function SiteMap() {}
