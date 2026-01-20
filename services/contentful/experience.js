import { fetchContent } from './client';

const EXPERIENCE_GRAPHQL_QUERY = `
query experienceCollectionQuery {
  experienceCollection(order: startDate_DESC) {
    items {
      sys {
        id
      }
      company
      position
      startDate
      endDate
      location
      description {
        json
      }
      technologies
    }
  }
}
`;

/**
 * Obtiene las experiencias laborales desde Contentful.
 * Ordenadas por fecha de inicio descendente (más reciente primero).
 * @returns {Promise<Array>} Array de experiencias crudas desde Contentful.
 */
export async function getExperiences() {
  const { data } = await fetchContent(EXPERIENCE_GRAPHQL_QUERY);
  return data?.experienceCollection?.items || [];
}
