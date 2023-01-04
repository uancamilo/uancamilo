import { getServerSideSitemap } from "next-sitemap";
import { getAllPostsWithSlug } from "../../lib/api";

export async function getServerSideProps(context) {
	//fetch urls desde la api de contenful con graphql
	const urls = await getAllPostsWithSlug();

	//paginas estaticas ingresadas manualmente

	const principales = [
		{
			loc: "https://uancamilo.vercel.app/",
			lastmod: new Date().toDateString("2023-01-02T00:00.000-05:00"),
			changefreq: "monthly",
			priority: "1.0",
		},
		{
			loc: "https://uancamilo.vercel.app/contacto",
			lastmod: new Date().toDateString("2023-01-02T00:00.000-05:00"),
			changefreq: "monthly",
			priority: "0.9",
		},
	];

	const fields = urls?.map((url) => ({
		loc: `https://uancamilo.vercel.app/pagina/${url.slug}`,
		lastmod: new Date().toDateString(url.date),
		changefreq: "monthly",
		priority: "0.8",
	}));

	principales.push(...fields);

	return getServerSideSitemap(context, principales);
}

export default function SiteMap() {}
