import { fetchContent } from './client';

/**
 * Query para obtener todos los posts del blog con datos para la lista
 * Incluye content para permitir búsqueda en el contenido
 * El filtrado por categoría y búsqueda se hace en el adapter
 */
const BLOG_POSTS_QUERY = `
query blogPostsQuery {
  blogPostCollection(order: publishedDate_DESC) {
    items {
      sys {
        id
        publishedAt
      }
      title
      slug
      excerpt
      publishedDate
      tags
      content
      coverImage {
        url
        width
        height
        description
      }
      category {
        ... on BlogCategory {
          name
          slug
        }
      }
      author {
        ... on PersonalInfo {
          name
          profileImage {
            url
          }
        }
      }
    }
  }
}
`;

/**
 * Query para obtener un post individual por slug con contenido completo
 * El campo content es Long Text (Markdown)
 */
const BLOG_POST_BY_SLUG_QUERY = `
query blogPostBySlugQuery($slug: String!) {
  blogPostCollection(where: { slug: $slug }, limit: 1) {
    items {
      sys {
        id
        publishedAt
      }
      title
      slug
      excerpt
      publishedDate
      tags
      coverImage {
        url
        width
        height
        description
      }
      category {
        ... on BlogCategory {
          name
          slug
          description
        }
      }
      author {
        ... on PersonalInfo {
          name
          email
          profileImage {
            url
          }
          website
        }
      }
      content
    }
  }
}
`;

/**
 * Query para obtener todos los slugs de posts (para generateStaticParams)
 */
const BLOG_SLUGS_QUERY = `
query blogSlugsQuery {
  blogPostCollection {
    items {
      slug
      sys {
        publishedAt
      }
    }
  }
}
`;

/**
 * Query para obtener todas las categorías del blog
 */
const BLOG_CATEGORIES_QUERY = `
query blogCategoriesQuery {
  blogCategoryCollection(order: order_ASC) {
    items {
      sys {
        id
      }
      name
      slug
      description
      order
    }
  }
}
`;

/**
 * Obtiene todos los posts del blog
 * @returns {Promise<Array>} Array de posts crudos desde Contentful
 */
export async function getAllBlogPosts() {
  const { data } = await fetchContent(BLOG_POSTS_QUERY);
  return data?.blogPostCollection?.items || [];
}

/**
 * Obtiene un post individual por su slug
 * @param {string} slug - Slug único del post
 * @returns {Promise<Object|null>} Post crudo o null si no existe
 */
export async function getBlogPostBySlug(slug) {
  const { data } = await fetchContent(BLOG_POST_BY_SLUG_QUERY, { slug });
  return data?.blogPostCollection?.items?.[0] || null;
}

/**
 * Obtiene todos los slugs de posts (para generateStaticParams)
 * @returns {Promise<Array>} Array de objetos con slug y publishedAt
 */
export async function getAllBlogSlugs() {
  const { data } = await fetchContent(BLOG_SLUGS_QUERY);
  return data?.blogPostCollection?.items || [];
}

/**
 * Obtiene todas las categorías del blog ordenadas
 * @returns {Promise<Array>} Array de categorías crudas desde Contentful
 */
export async function getAllBlogCategories() {
  const { data } = await fetchContent(BLOG_CATEGORIES_QUERY);
  return data?.blogCategoryCollection?.items || [];
}
