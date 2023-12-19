const ENTRIES_GRAPHQL_FIELDS = `
slug
title
coverImage {
	url
}
date
author {
	name
picture {
		url
	}
}
excerpt
content {
	json
	links {
		assets {
			block {
				sys {
					id
				}
				url
				description
			}
		}
	}
}
`;

async function fetchGraphQL(query, preview = false) {
	try {
		const response = await fetch(
			`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${
						preview
							? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
							: process.env.CONTENTFUL_ACCESS_TOKEN
					}`,
				},
				body: JSON.stringify({ query }),
			}
		);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching GraphQL:", error);
		return null;
	}
}

function extractPostEntries(fetchResponse) {
	return fetchResponse?.data?.estaticasCollection?.items;
}

export async function getEntries(preview) {
	try {
		const entries = await fetchGraphQL(
			`query {
				estaticasCollection(order: date_DESC, preview: ${preview ? "true" : "false"}) {
			items {
            ${ENTRIES_GRAPHQL_FIELDS}
		}
	}
}`,
			preview
		);
		return extractPostEntries(entries);
	} catch (error) {
		console.error("Error getting entries:", error);
		return [];
	}
}
