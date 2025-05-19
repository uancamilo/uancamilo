import { useRouter } from "next/router";
import Container from "../../components/container";
import Layout from "../../components/layout";
import ErrorPage from "next/error";
import {
	getEntriesAndMoreEntries,
	getEntriesWithSlug,
} from "../../lib/contentful";
import PaginaBody from "../../components/pagina-body";

export default function Recurso({ recurso, preview }) {
	const router = useRouter();

	if (router.isFallback) {
		return (
			<Layout preview={preview}>
				<Container>
					<p className="text-center py-10 text-gray-600">Cargando...</p>
				</Container>
			</Layout>
		);
	}

	if (!recurso) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<Layout preview={preview}>
			<Container>
				<div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8 pt-24 px-4 max-w-6xl mx-auto">
					<main className="order-first">
						<article>
							<header className="mb-10 text-center">
								<h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 mb-2">
									{recurso.titulo}
								</h1>
							</header>

							<section className="prose prose-lg max-w-none">
								<PaginaBody
									contenido={recurso.contenido}
									autor={recurso.autor}
									fecha={recurso.fecha}
									extracto={recurso.extracto}
									slug={recurso.slug}
									titulo={recurso.titulo}
								/>
							</section>
						</article>
					</main>

					<aside className="order-last lg:order-none">
						<div className="bg-gray-200 rounded-md p-4 animate-pulse space-y-4">
							<div className="h-6 bg-gray-300 rounded w-3/4"></div>
							<div className="h-40 bg-gray-300 rounded"></div>
							<div className="h-6 bg-gray-300 rounded w-1/2"></div>
						</div>
					</aside>
				</div>
			</Container>
		</Layout>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const data = await getEntriesAndMoreEntries(params.slug, preview);

	return {
		props: {
			preview,
			recurso: data?.recurso ?? null,
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	const allEntries = await getEntriesWithSlug();

	return {
		paths:
			allEntries?.map(({ slug }) => ({
				params: { slug },
			})) ?? [],
		fallback: true,
	};
}
