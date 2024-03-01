import Head from "next/head";
import Layout from "../components/layout";
import Intro from "../components/intro";
import Container from "../components/container";
import HeroEntries from "../components/hero-entries";
import MasPaginas from "../components/mas-paginas";
import { getEntries } from "../lib/contentful";

export default function Index({ entries, structuredData }) {
	const paginaPrincipal = entries[0];
	const masPaginas = entries.slice(1);

	return (
		<Layout>
			<Head>
				<title>FrontEnd | Juan Camilo Serna</title>
				<meta
					name="description"
					content="Juan Camilo Serna Fron-End Developer"
				/>
				<link rel="canonical" href="https://uancamilo.vercel.app/" />
				<script
					key="structured-data"
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
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
	);
}
export async function getStaticProps() {
	const entries = await getEntries();
	return {
		props: {
			entries,
			structuredData: {
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "Juan Camilo Serna - Front End Developer",
				url: "https://uancamilo.vercel.app/",
				contactPoint: {
					"@type": "ContactPoint",
					telephone: "+57 300 553 4 553",
					contactType: "More information",
					email: "uancamilo@gmail.com",
				},
			},
		},
	};
}
