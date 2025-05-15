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
				<article className="max-w-3xl mx-auto pt-24">
					<h1 className="text-3xl font-bold mb-4">{recurso.titulo}</h1>
					{/* Puedes agregar más campos como fecha, imagen, autor, etc. aquí */}
					<PaginaBody contenido={recurso.contenido} />
				</article>
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