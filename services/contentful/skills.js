import { fetchContent } from './client';

const SKILLS_GRAPHQL_QUERY = `
query skillsCollectionQuery {
  skillsCollection(order: order_ASC) {
    items {
      sys {
        id
      }
      name
      description
      features
      level
      order
      url
      category
    }
  }
}
`;

/**
 * Obtiene las skills desde Contentful.
 * Ordenadas por el campo order ascendente.
 * @returns {Promise<Array>} Array de skills crudas desde Contentful.
 */
export async function getSkills() {
  const { data } = await fetchContent(SKILLS_GRAPHQL_QUERY);
  return data?.skillsCollection?.items || [];
}
