import Layout from "../components/layout";
import Intro from "../components/intro";
import Container from "../components/container";

import { createClient } from "contentful";

export default function Page({ estaticas }) {
	console.log(estaticas);

	const estaticasHero = estaticas[0];

	console.log(estaticasHero);
	return (
		<>
			<Layout>
				<Intro />
				<Container>
					Hero Post
				</Container>
			</Layout>
		</>
	);
}

export async function getStaticProps() {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_KEY,
	});

	const res = await client.getEntries({ content_type: "estaticas" });

	return {
		props: {
			estaticas: res.items,
		},
	};
}
