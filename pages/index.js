import Layout from "../components/layout";
import Intro from "../components/intro";
import Container from "../components/container";
import { getEntries } from "../lib/contentful";
import Head from "next/head";
import HeroEntries from "../components/hero-entries";


export async function getServerSideProps() {
	const entries = await getEntries();
	console.log(entries)
	return {
		props: {
			entries,
		},
	};
}

export default function Index({ entries }) {
	// console.log(entries);
	const heroEntries = entries[0];
	const allEntries = entries.slice(1);

	return (
		<>
			<Layout>
				<Head>
					<title>FrontEnd | Juan Camilo Serna</title>
				</Head>
				<Intro />
				<Container>
					{heroEntries && (
						<HeroEntries
							title={heroEntries.title}
							coverImage={heroEntries.coverImage}
							date={heroEntries.date}
							author={heroEntries.author}
							slug={heroEntries.slug}
							excerpt={heroEntries.excerpt}
						/>
					)}
				</Container>
			</Layout>
		</>
	);
}
