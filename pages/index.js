import Layout from "../components/layout";
import Intro from "../components/intro";
import Container from "../components/container";
import { getEntries } from "../lib/contentful"

export default function Index({ entries }) {
	console.log(entries);

	return (
		<>
			<Layout>
				<Intro />
				<Container>
					<p>Hero</p>
				</Container>
			</Layout>
		</>
	);
}

export async function getStaticProps() {
	try {
		const entries = await getEntries("estaticas");
		return {
			props: {
				entries,
			},
		};
	} catch (error) {
		console.error("Error fetching entries:", error);
		return {
			props: {
				entries: [],
			},
		};
	}
}
