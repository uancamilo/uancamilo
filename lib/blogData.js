import { cache } from 'react';
import { fetchAndAdapt } from './fetchAndAdapt';
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getAllBlogSlugs,
  getAllBlogCategories,
} from '../services/contentful/blog';
import {
  adaptBlogPosts,
  adaptBlogPostDetail,
  adaptBlogSlugs,
  adaptBlogCategories,
} from '../logic/blog.logic';

/**
 * Fetchers cacheados con React.cache() para el blog.
 *
 * Igual que el resto de fetchers de Contentful, usamos cache()
 * para garantizar una sola llamada por render cuando múltiples
 * componentes solicitan los mismos datos.
 */

/**
 * Obtiene todos los posts del blog (cacheado)
 * @returns {Promise<Array>} Array de posts adaptados
 */
export const getCachedAllBlogPosts = cache(() =>
  fetchAndAdapt(
    getAllBlogPosts,
    adaptBlogPosts,
    { label: 'blog posts' }
  )
);

/**
 * Normaliza texto para búsqueda (minúsculas, sin acentos)
 * @param {string} text - Texto a normalizar
 * @returns {string} Texto normalizado
 */
function normalizeForSearch(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Verifica si un post coincide con el término de búsqueda
 * Busca en: título, excerpt, tags y contenido
 * @param {Object} post - Post adaptado
 * @param {string} searchTerm - Término de búsqueda normalizado
 * @returns {boolean} True si coincide
 */
function postMatchesSearch(post, searchTerm) {
  const fieldsToSearch = [
    post.title,
    post.excerpt,
    post.content,
    ...(post.tags || []),
  ];

  return fieldsToSearch.some((field) =>
    normalizeForSearch(field).includes(searchTerm)
  );
}

/**
 * Obtiene posts del blog con filtros opcionales
 * @param {Object} options - Opciones de filtrado
 * @param {string|null} options.categorySlug - Slug de categoría para filtrar
 * @param {string|null} options.searchQuery - Término de búsqueda
 * @returns {Promise<Array>} Array de posts adaptados y filtrados
 */
export async function getCachedBlogPosts({ categorySlug = null, searchQuery = null } = {}) {
  let posts = await getCachedAllBlogPosts();

  // Filtrar por categoría
  if (categorySlug) {
    posts = posts.filter((post) => post.category?.slug === categorySlug);
  }

  // Filtrar por búsqueda (límite de 100 caracteres para prevenir abusos)
  if (searchQuery && searchQuery.trim() && searchQuery.trim().length <= 100) {
    const normalizedQuery = normalizeForSearch(searchQuery.trim());
    posts = posts.filter((post) => postMatchesSearch(post, normalizedQuery));
  }

  return posts;
}

/**
 * Obtiene un post individual por slug
 * @param {string} slug - Slug único del post
 * @returns {Promise<Object|null>} Post adaptado o null
 */
export const getCachedBlogPost = cache((slug) =>
  fetchAndAdapt(
    () => getBlogPostBySlug(slug),
    adaptBlogPostDetail,
    { fallback: null, label: `blog post "${slug}"` }
  )
);

/**
 * Obtiene posts relacionados basados en tags compartidos
 * @param {Object} currentPost - Post actual
 * @param {number} limit - Máximo de posts a retornar
 * @returns {Promise<Array>} Array de posts relacionados ordenados por relevancia
 */
export async function getRelatedPosts(currentPost, limit = 3) {
  if (!currentPost?.tags?.length) {
    return [];
  }

  const allPosts = await getCachedAllBlogPosts();

  // Filtrar el post actual y calcular relevancia
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      // Contar tags en común
      const sharedTags = post.tags?.filter((tag) =>
        currentPost.tags.includes(tag)
      ) || [];

      return {
        ...post,
        relevance: sharedTags.length,
      };
    })
    .filter((post) => post.relevance > 0) // Solo posts con al menos 1 tag en común
    .sort((a, b) => b.relevance - a.relevance) // Ordenar por más tags en común
    .slice(0, limit);

  return relatedPosts;
}

/**
 * Obtiene todos los slugs de posts (para generateStaticParams y sitemap)
 * @returns {Promise<Array>} Array de objetos { slug, lastModified }
 */
export const getCachedBlogSlugs = cache(() =>
  fetchAndAdapt(
    getAllBlogSlugs,
    adaptBlogSlugs,
    { label: 'blog slugs' }
  )
);

/**
 * Obtiene todas las categorías del blog
 * @returns {Promise<Array>} Array de categorías adaptadas
 */
export const getCachedBlogCategories = cache(() =>
  fetchAndAdapt(
    getAllBlogCategories,
    adaptBlogCategories,
    { label: 'blog categories' }
  )
);
