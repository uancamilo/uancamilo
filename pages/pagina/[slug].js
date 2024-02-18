import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PaginaBody from "../../components/pagina-body";
import MasPaginas from "../../components/mas-paginas";
import CabeceraPagina from "../../components/cabecera-pagina";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import TituloPagina from "../../components/titulo-pagina";
import {
	getEntriesAndMoreEntries,
	getEntriesWithSlug,
} from "../../lib/contentful";

export default function Estatica({
	contenido,
	masContenido,
	preview,
	structuredData,
}) {
	const router = useRouter();

	if (!router.isFallback && !contenido) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<Layout preview={preview}>
			<Container>
				{/* <Header /> */}
				{router.isFallback ? (
					<TituloPagina>Cargando...</TituloPagina>
				) : (
					<>
						<article className="pb-10">
							<Head>
								<title>{contenido.title}</title>
								<meta property="og:title" content={contenido.title} />
								<meta property="og:description" content={contenido.excerpt} />
								<meta property="og:image" content={contenido.coverImage.url} />
								<meta
									property="og:url"
									content={`https://uancamilo.vercel.app/pagina/${contenido.slug}`}
								/>
								<meta property="og:type" content="website" />
								<script
									key="structured-data"
									type="application/ld+json"
									dangerouslySetInnerHTML={{
										__html: JSON.stringify(structuredData),
									}}
								/>
							</Head>
							<CabeceraPagina
								title={contenido.title}
								coverImage={contenido.coverImage}
							/>
							<div className="lg:w-10/12 lg:mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10">
								<div className="col-span-2">
									<PaginaBody
										content={contenido.content}
										author={contenido.author}
										date={contenido.date}
										contenido={contenido}
									/>
								</div>
								<div className="bg-gray-200"></div>
							</div>
						</article>
						{masContenido && masContenido.length > 0 && (
							<MasPaginas paginas={masContenido} />
						)}
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
