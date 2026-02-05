import { formatDate, formatDateLong } from '../lib/dateUtils';
import { generateId } from '../lib/generateId';

/**
 * Calcula el tiempo de lectura estimado basado en el contenido markdown
 * @param {string} content - Contenido markdown
 * @returns {number} Minutos estimados de lectura
 */
function calculateReadingTime(content) {
  if (!content || typeof content !== 'string') return 1;

  // Contar palabras en el contenido markdown
  const wordCount = content.split(/\s+/).filter(Boolean).length;

  // Promedio de 200 palabras por minuto
  const minutes = Math.ceil(wordCount / 200);
  return Math.max(1, minutes);
}

/**
 * Transforma un post crudo de Contentful a formato de UI para la lista
 * @param {Object} rawPost - Post crudo desde Contentful
 * @returns {Object|null} Post transformado para la UI
 */
function adaptBlogPost(rawPost) {
  if (!rawPost) return null;

  return {
    id: rawPost.sys?.id || generateId(),
    title: rawPost.title || 'Sin título',
    slug: rawPost.slug || '',
    excerpt: rawPost.excerpt || '',
    publishedDate: rawPost.publishedDate,
    publishedDateFormatted: formatDateLong(rawPost.publishedDate),
    publishedDateShort: formatDate(rawPost.publishedDate),
    lastModified: rawPost.sys?.publishedAt || rawPost.publishedDate,
    tags: Array.isArray(rawPost.tags) ? rawPost.tags : [],
    coverImage: rawPost.coverImage
      ? {
          url: rawPost.coverImage.url,
          width: rawPost.coverImage.width,
          height: rawPost.coverImage.height,
          alt: rawPost.coverImage.description || rawPost.title,
        }
      : null,
    category: rawPost.category
      ? {
          name: rawPost.category.name,
          slug: rawPost.category.slug,
          description: rawPost.category.description || null,
        }
      : null,
    author: rawPost.author
      ? {
          name: rawPost.author.name,
          email: rawPost.author.email || null,
          website: rawPost.author.website || null,
          image: rawPost.author.profileImage?.url || null,
        }
      : null,
    // Solo disponible en post individual
    content: rawPost.content || null,
    readingTime: rawPost.content ? calculateReadingTime(rawPost.content) : null,
  };
}

/**
 * Transforma un array de posts crudos de Contentful a formato de UI
 * @param {Array} rawPosts - Array de posts desde Contentful
 * @returns {Array} Array de posts transformados
 */
export function adaptBlogPosts(rawPosts) {
  if (!rawPosts || !Array.isArray(rawPosts)) {
    return [];
  }

  return rawPosts.map(adaptBlogPost).filter(Boolean);
}

/**
 * Transforma un post individual para vista detallada
 * @param {Object} rawPost - Post crudo desde Contentful
 * @returns {Object|null} Post transformado con contenido completo
 */
export function adaptBlogPostDetail(rawPost) {
  return adaptBlogPost(rawPost);
}

/**
 * Transforma una categoría cruda de Contentful a formato de UI
 * @param {Object} rawCategory - Categoría cruda desde Contentful
 * @returns {Object|null} Categoría transformada
 */
function adaptBlogCategory(rawCategory) {
  if (!rawCategory) return null;

  return {
    id: rawCategory.sys?.id || generateId(),
    name: rawCategory.name || 'Sin nombre',
    slug: rawCategory.slug || '',
    description: rawCategory.description || null,
    order: rawCategory.order ?? 0,
  };
}

/**
 * Transforma un array de categorías crudas de Contentful a formato de UI
 * @param {Array} rawCategories - Array de categorías desde Contentful
 * @returns {Array} Array de categorías transformadas
 */
export function adaptBlogCategories(rawCategories) {
  if (!rawCategories || !Array.isArray(rawCategories)) {
    return [];
  }

  return rawCategories.map(adaptBlogCategory).filter(Boolean);
}

/**
 * Extrae los slugs para generateStaticParams
 * @param {Array} rawSlugs - Array de objetos con slug desde Contentful
 * @returns {Array} Array de objetos { slug } para Next.js
 */
export function adaptBlogSlugs(rawSlugs) {
  if (!rawSlugs || !Array.isArray(rawSlugs)) {
    return [];
  }

  return rawSlugs
    .filter((item) => item?.slug)
    .map((item) => ({
      slug: item.slug,
      lastModified: item.sys?.publishedAt,
    }));
}
