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

const ENTRIES_GRAPHQL_FIELDS_HABILIDADES = `
title
coverImage {
	url
}
excerpt
tagsCollection {
	items{
		title
	}
}
`;

const ENTRIES_GRAPHQL_FIELDS_SERVICES = `
title
descripcion
imagen {
url
}
`;

const ENTRIES_GRAPHQL_FIELDS_DATOS_ESTRUCTURADOS = `
name
description
complement
`;

const ENTRIES_GRAPHQL_FIELDS_RECURSOS = `
titulo
slug
contenido {
	json
}
extracto
fecha
imagen {
	url
}
autor {
	name
	picture {
		url
	}
}
`;

async function fetchGraphQL(query, preview = false) {
	try {
		const response = await fetch(
			`https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${
						preview
							? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
							: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
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
		if (error instanceof Error && error.message) {
			console.error("Contentful API Error:", error.message);
		}
		return null;
	}
}

function extractEntries(fetchResponse) {
	return fetchResponse?.data?.estaticasCollection?.items;
}

function extractEntry(fetchResponse) {
	return fetchResponse?.data?.estaticasCollection?.items?.[0];
}

function extractSkills(fetchResponse) {
	return fetchResponse?.data?.habilidadesCollection?.items;
}

function extractServices(fetchResponse) {
	return fetchResponse?.data?.servicesCollection?.items;
}

function extractDatosEstructurados(fetchResponse) {
	return fetchResponse?.data?.datosEstructuradosCollection?.items;
}

function extractRecursos(fetchResponse) {
	return fetchResponse?.data?.recursosCollection?.items;
}

export async function getRecursos(preview, search = "") {
	try {
		const isSearching = Boolean(search);
		const fields = ENTRIES_GRAPHQL_FIELDS_RECURSOS;

		const recursos = await fetchGraphQL(
			`query {
				recursosCollection(
					${
						isSearching
							? `
						where: {
							OR: [
								{ titulo_contains: "${search}" },
								{ extracto_contains: "${search}" }
							]
						},
					`
							: `limit: 1,`
					}
					order: fecha_DESC,
					preview: ${preview ? "true" : "false"}
				) {
					items {
						${fields}
					}
				}
			}`,
			preview
		);

		return extractRecursos(recursos);
	} catch (error) {
		console.error("Error getting recursos:", error);
		return [];
	}
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
		return extractEntries(entries);
	} catch (error) {
		console.error("Error getting entries:", error);
		return [];
	}
}

export async function getDatosEstructurados(preview) {
	try {
		const datosEstructurados = await fetchGraphQL(
			`query {
			datosEstructuradosCollection(preview: ${preview ? "true" : "false"}) {
				items {
					${ENTRIES_GRAPHQL_FIELDS_DATOS_ESTRUCTURADOS}
				}
			}
		}`
		);
		return extractDatosEstructurados(datosEstructurados);
	} catch (error) {
		console.error("Error getting datosEstructurados:", error);
		return [];
	}
}

export async function getServices(preview) {
	try {
		const services = await fetchGraphQL(
			`query {
			servicesCollection(preview: ${preview ? "true" : "false"}) {
				items {
					${ENTRIES_GRAPHQL_FIELDS_SERVICES}
				}
			}
		}`,
			preview
		);
		return extractServices(services);
	} catch (error) {
		console.error("Error getting service:", error);
		return [];
	}
}

export async function getEntriesWithSlug() {
	const entries = await fetchGraphQL(
		`query {
			estaticasCollection(where: { slug_exists: true }, order: date_DESC) {
				items {
					${ENTRIES_GRAPHQL_FIELDS}
				}
			}
		}`
	);
	return extractEntries(entries);
}

export async function getEntriesAndMoreEntries(slug, preview) {
	const entry = await fetchGraphQL(
		`query {
			estaticasCollection(
				where: { slug: "${slug}" }
				preview: ${preview ? "true" : "false"}
				limit: 1
			) {
				items {
					${ENTRIES_GRAPHQL_FIELDS}
				}
			}
		}`,
		preview
	);
	const entries = await fetchGraphQL(
		`query {
			estaticasCollection(
				where: { slug_not_in: "${slug}" }
				order: date_DESC
				preview: ${preview ? "true" : "false"}
				limit: 3
			) {
				items {
					${ENTRIES_GRAPHQL_FIELDS}
				}
			}
		}`,
		preview
	);
	return {
		contenido: extractEntry(entry),
		masContenido: extractEntries(entries),
	};
}

export async function getSkills(preview) {
	try {
		const skills = await fetchGraphQL(
			`query {
				habilidadesCollection(
					order: date_DESC
					preview: ${preview ? "true" : "false"}
				) {
					items {
						${ENTRIES_GRAPHQL_FIELDS_HABILIDADES}
					}
				}
			}`,
			preview
		);
		return extractSkills(skills);
	} catch (error) {
		console.error("Error getting skills:", error);
		return [];
	}
}
