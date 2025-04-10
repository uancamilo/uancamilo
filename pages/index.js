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
				<title>
					Juan Camilo Serna | Desarrollador Fullstack React y Spring Boot
				</title>
				<meta
					name="description"
					content="Soy Juan Camilo Serna, desarrollador fullstack especializado en tecnologías modernas como React, Spring Boot y Node.js. Diseño soluciones web rápidas, accesibles y centradas en el usuario."
				/>
				<link rel="canonical" href="https://uancamilo.vercel.app/" />
				<link rel="icon" href="images/logo.ico" type="image/x-icon" />
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
				"@type": "Person",
				name: "Juan Camilo Serna",
				url: "https://uancamilo.vercel.app/",
				image: "https://avatars.githubusercontent.com/u/36907625?v=4",
				jobTitle: "Desarrollador Fullstack",
				worksFor: {
					"@type": "Organization",
					name: "Freelance",
				},
				sameAs: [
					"https://www.linkedin.com/in/uancamilo/",
					"https://github.com/uancamilo",
					"https://www.facebook.com/uancamilo",
					"https://www.instagram.com/uancamilo/",
					"https://twitter.com/uancamilo",
					"https://www.tiktok.com/@uancamilo",
				],
				knowsAbout: [
					"React",
					"Next.js",
					"Node.js",
					"JavaScript",
					"Tailwind CSS",
					"HTML",
					"CSS",
					"Bootstrap",
					"Python",
					"Spring Boot",
					"Java",
					"SQL",
				],
				description:
					"Soy Juan Camilo Serna, desarrollador fullstack con experiencia en interfaces modernas, desarrollo web con React, Spring Boot, y optimización de sitios para performance y SEO.",
			},
		},
		revalidate: 1,
	};
}
