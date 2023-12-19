import { createClient } from "contentful";

const client = createClient({
	space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
	accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
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
