import { fetchContent } from './client';

const EDUCATION_GRAPHQL_QUERY = `
query educationCollectionQuery {
  educationCollection(order: startDate_DESC) {
    items {
      sys {
        id
      }
      institution
      degree
      startDate
      endDate
      description
      location
      certification {
        url
      }
    }
  }
}
`;

/**
 * Obtiene la formación académica desde Contentful.
 * Ordenada por fecha de inicio descendente (más reciente primero).
 * @returns {Promise<Array>} Array de educación cruda desde Contentful.
 */
export async function getEducation() {
  const { data } = await fetchContent(EDUCATION_GRAPHQL_QUERY);
  return data?.educationCollection?.items || [];
}
