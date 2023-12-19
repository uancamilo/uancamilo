import { createClient } from "contentful";

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export async function getEntries(content_type) {
	const entries = await client.getEntries({
		content_type,
	});

	return entries.items;
}
