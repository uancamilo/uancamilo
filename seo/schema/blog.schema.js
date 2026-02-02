/**
 * Builder para schema CollectionPage del blog (página de lista)
 * @param {Object} data - Datos del blog
 * @param {Object} [options] - Opciones adicionales
 * @param {string} [options.siteUrl] - URL base del sitio
 * @param {Array} [options.posts] - Array de posts para incluir en la colección
 * @returns {Object} Schema CollectionPage válido
 */
export function buildBlogSchema(data, options = {}) {
  const { siteUrl = '', posts = [] } = options;
  const blogUrl = `${siteUrl}/blog`;

  const schema = {
    '@type': 'CollectionPage',
    '@id': `${blogUrl}#webpage`,
    name: 'Blog',
    description: 'Artículos, apuntes y recursos sobre programación y tecnología.',
    url: blogUrl,
    inLanguage: 'es-CO',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
    },
  };

  // Agregar referencia a la persona/autor principal
  if (data?.name) {
    schema.author = {
      '@type': 'Person',
      '@id': `${siteUrl}#person`,
      name: data.name,
    };
  }

  // Agregar items de la colección como hasPart
  if (posts.length > 0) {
    schema.hasPart = posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${siteUrl}/blog/${post.slug}#article`,
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
    }));

    schema.numberOfItems = posts.length;
  }

  return schema;
}

/**
 * Builder para schema Blog (contenedor de BlogPosting)
 * @param {Object} data - Datos del autor/persona
 * @param {Object} [options] - Opciones adicionales
 * @param {string} [options.siteUrl] - URL base del sitio
 * @returns {Object} Schema Blog válido
 */
export function buildBlogContainerSchema(data, options = {}) {
  const { siteUrl = '' } = options;
  const blogUrl = `${siteUrl}/blog`;

  const schema = {
    '@type': 'Blog',
    '@id': `${blogUrl}#blog`,
    name: 'Blog',
    description: 'Artículos, apuntes y recursos sobre programación y tecnología.',
    url: blogUrl,
    inLanguage: 'es-CO',
  };

  // Agregar referencia al autor principal
  if (data?.name) {
    schema.author = {
      '@type': 'Person',
      '@id': `${siteUrl}#person`,
      name: data.name,
    };
  }

  // Agregar imagen del blog si hay imagen de perfil
  if (data?.profileImage?.url) {
    schema.image = data.profileImage.url;
  }

  return schema;
}
