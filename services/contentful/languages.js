import { fetchContent } from './client';

const LANGUAGES_GRAPHQL_QUERY = `
query languagesCollectionQuery {
  languagesCollection(order: order_ASC) {
    items {
      sys {
        id
      }
      name
      level
      percentage
      certification {
        url
      }
      order
    }
  }
}
`;

/**
 * Obtiene los idiomas desde Contentful.
 * Ordenados por el campo order ascendente.
 * @returns {Promise<Array>} Array de idiomas crudos desde Contentful.
 */
export async function getLanguages() {
  const { data } = await fetchContent(LANGUAGES_GRAPHQL_QUERY);
  return data?.languagesCollection?.items || [];
}
