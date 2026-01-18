import { fetchContent } from './client';

const PERSONAL_INFO_GRAPHQL_QUERY = `
query personalInfoCollectionQuery {
  personalInfoCollection(limit: 1) {
    items {
      name
      title
      description
      summary {
        json
      }
      email
      phone
      location
      website
      profileImage {
        url
        width
        height
      }
      socialLinksCollection {
        items {
          ... on SocialLink {
            name
            url
          }
        }
      }
    }
  }
}
`;

/**
 * Obtiene la información personal desde Contentful.
 * @returns {Promise<any>} Los datos crudos de la información personal desde Contentful.
 */
export async function getPersonalInfo() {
  const { data } = await fetchContent(PERSONAL_INFO_GRAPHQL_QUERY);
  return data?.personalInfoCollection?.items?.[0] || null;
}
