/**
 * Builder para schema BlogPosting de Schema.org
 * @param {Object} post - Post del blog adaptado
 * @param {Object} [options] - Opciones adicionales
 * @param {string} [options.siteUrl] - URL base del sitio
 * @returns {Object} Schema BlogPosting válido
 */
export function buildBlogPostingSchema(post, options = {}) {
  const { siteUrl = '' } = options;
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const schema = {
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    dateModified: post.lastModified || post.publishedDate,
    url: postUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  // Imagen de portada
  if (post.coverImage?.url) {
    schema.image = {
      '@type': 'ImageObject',
      url: post.coverImage.url,
      width: post.coverImage.width,
      height: post.coverImage.height,
    };
  }

  // Autor
  if (post.author) {
    schema.author = {
      '@type': 'Person',
      name: post.author.name,
    };

    if (post.author.website) {
      schema.author.url = post.author.website;
    }

    if (post.author.image) {
      schema.author.image = post.author.image;
    }
  }

  // Palabras clave (tags)
  if (post.tags?.length > 0) {
    schema.keywords = post.tags.join(', ');
  }

  // Categoría como articleSection
  if (post.category?.name) {
    schema.articleSection = post.category.name;
  }

  // Tiempo de lectura estimado
  if (post.readingTime) {
    schema.timeRequired = `PT${post.readingTime}M`;
  }

  // Idioma
  schema.inLanguage = 'es-CO';

  return schema;
}
