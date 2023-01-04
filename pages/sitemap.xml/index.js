import { getServerSideSitemap } from "next-sitemap";
import { getAllPostsWithSlug } from "../../lib/api";

export async function getServerSideProps(context) {
	//fetch urls
	const urls = await getAllPostsWithSlug();
	const fields = urls?.map((url) => ({
		loc: `https://uancamilo.vercel.app/pagina/${url.slug}`,
	}));

	return getServerSideSitemap(context, fields);
}

export default function SiteMap() {}
