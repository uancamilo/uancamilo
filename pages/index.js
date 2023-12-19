import Layout from "../components/layout";
import Intro from "../components/intro";
import Container from "../components/container";
import { getEntries } from "../lib/contentful";

export async function getServerSideProps() {
	const entries = await getEntries("estaticas");
	return {
		props: {
			entries,
		},
	};
}

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
