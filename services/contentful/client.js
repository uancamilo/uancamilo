// Función genérica para peticiones GraphQL a Contentful.
export async function fetchContent(query) {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId || !accessToken) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Las variables de entorno de Contentful para GraphQL no están configuradas.');
    }
    return { data: null, errors: [{ message: 'Las variables de entorno de Contentful no están configuradas.' }] };
  }

  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error al obtener datos de Contentful GraphQL:', error);
    }
    return { data: null, errors: [error] };
  }
}
