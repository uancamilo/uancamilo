import Layout from "../components/layout";
import Intro from "../components/intro";
import Container from "../components/container";
import { createClient } from "contentful";

export default function Index({ estaticas }) {
	console.log(estaticas);

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
		const client = createClient({
			space: process.env.CONTENTFUL_SPACE_ID,
			accessToken: process.env.CONTENTFUL_ACCESS_KEY,
		});
		const res = await client.getEntries({ content_type: "estaticas" });

		return {
			props: {
				estaticas: res.items,
			},
			revalidate: 60, // tiempo en segundos para regenerar la página estática
		};
	} catch (error) {
		console.error("Error al obtener datos estáticos:", error);
		throw error;
	}
}
