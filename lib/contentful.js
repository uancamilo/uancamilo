import { createClient } from "contentful";

const client = createClient({
	space: process.env.contenfulSpaceId,
	accessToken: process.env.contentfulAccessKey,
});

export async function getEntries(content_type) {
	try {
		const entries = await client.getEntries({
			content_type,
		});

		return entries.items;
	} catch (error) {
		console.error("Error fetching entries:", error);
		return [];
	}
}
