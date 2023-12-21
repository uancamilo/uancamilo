import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import Container from "../../components/container";
import EstaticaBody from "../../components/estatica-body";
import MoreEstaticas from "../../components/mas-estaticas";
import EstaticasHeader from "../../components/estaticas-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import EstaticasTitle from "../../components/estaticas-title";
import {
	getEntriesAndMoreEntries,
	getEntriesWithSlug,
} from "../../lib/contentful";

export default function Estatica({
	contenido,
	masContenido,
	preview,
	structuredData,
	post,
	morePosts,
}) {
	const router = useRouter();

	if (!router.isFallback && !contenido) {
		return <ErrorPage statusCode={404} />;
	}

	console.log(contenido);

	return (
		<Layout preview={preview}>
			<Container>
				{/* <Header /> */}
				{router.isFallback ? (
					<EstaticasTitle>Cargando...</EstaticasTitle>
				) : (
					<>
						<article className="pb-10">
							<Head>
								<title>{contenido.title} | FrontEnd Juan Camilo Serna</title>
								<meta property="og:image" content={contenido.coverImage.url} />
								<script
									key="structured-data"
									type="application/ld+json"
									dangerouslySetInnerHTML={{
										__html: JSON.stringify(structuredData),
									}}
								/>
							</Head>
							<EstaticasHeader
								title={contenido.title}
								coverImage={contenido.coverImage}
							/>
							<div className="lg:w-10/12 lg:mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10">
								<div className="col-span-2">
									<EstaticaBody
										content={contenido.content}
										author={contenido.author}
										date={contenido.date}
									/>
								</div>
								<div className="bg-gray-200"></div>
							</div>
						</article>
						{/* {masContenido && masContenido.length > 0 && (
							<MoreEstaticas estaticas={moreEntries} />
						)} */}
						<SectionSeparator />
					</>
				)}
			</Container>
		</Layout>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const data = await getEntriesAndMoreEntries(params.slug, preview);

	return {
		props: {
			preview,
			contenido: data?.contenido ?? null,
			masContenido: data?.masContenido ?? null,
			structuredData: {
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				headline: data?.contenido.title,
				description: data?.contenido.excerpt,
				author: [
					{
						"@type": "Person",
						name: data?.contenido.author,
						url: "https://uancamilo.vercel.app/perfil",
					},
				],
				image: data?.contenido.coverImage.url,
				datePublished: data?.contenido.date,
			},
		},
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const allEntries = await getEntriesWithSlug();
	return {
		paths: allEntries?.map(({ slug }) => `/pagina/${slug}`) ?? [],
		fallback: true,
	};
}
