import Head from "next/head";
import Layout from "../components/layout";
import Intro from "../components/intro";
import Container from "../components/container";
import HeroEntries from "../components/hero-entries";
import MasPaginas from "../components/mas-paginas";
import { getEntries } from "../lib/contentful";

export default function Index({ entries }) {
	const paginaPrincipal = entries[0];
	const masPaginas = entries.slice(1);

	return (
		<>
			<Layout>
				<Head>
					<title>FrontEnd | Juan Camilo Serna</title>
				</Head>
				<Intro />
				<Container>
					{paginaPrincipal && (
						<HeroEntries
							title={paginaPrincipal.title}
							coverImage={paginaPrincipal.coverImage}
							date={paginaPrincipal.date}
							author={paginaPrincipal.author}
							slug={paginaPrincipal.slug}
							excerpt={paginaPrincipal.excerpt}
						/>
					)}
					{masPaginas.length > 0 && <MasPaginas paginas={masPaginas} />}
				</Container>
			</Layout>
		</>
	);
}
export async function getStaticProps() {
	const entries = await getEntries();
	return {
		props: {
			entries,
		},
	};
}
