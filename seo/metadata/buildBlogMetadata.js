/**
 * Construye metadata específica para la página de lista del blog
 * @param {Object} data - Datos de personalInfo (para autor y sitio)
 * @param {Object} [options] - Opciones adicionales
 * @param {string} [options.siteUrl] - URL base del sitio
 * @param {string|null} [options.categoryName] - Nombre de categoría activa
 * @returns {Object} Metadata para Next.js App Router
 */
export function buildBlogListMetadata(data, options = {}) {
  const { siteUrl = '', categoryName = null } = options;
  const blogUrl = `${siteUrl}/blog`;

  const title = categoryName
    ? `Blog - ${categoryName}`
    : 'Blog';

  const description = categoryName
    ? `Artículos sobre ${categoryName.toLowerCase()} en el blog de ${data?.name || 'desarrollo de software'}.`
    : `Blog de ${data?.name || 'desarrollo de software'}: artículos, tutoriales y buenas prácticas.`;

  const metadata = {
    title,
    description,
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: blogUrl,
      siteName: data?.name || 'Blog',
      locale: 'es_CO',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };

  // Agregar imagen si hay foto de perfil
  if (data?.profileImage?.url) {
    metadata.openGraph.images = [
      {
        url: data.profileImage.url,
        width: 1200,
        height: 630,
      },
    ];
    metadata.twitter.images = [data.profileImage.url];
  }

  return metadata;
}

/**
 * Construye metadata específica para un post individual del blog
 * @param {Object} post - Post del blog adaptado
 * @param {Object} [options] - Opciones adicionales
 * @param {string} [options.siteUrl] - URL base del sitio
 * @returns {Object} Metadata para Next.js App Router
 */
export function buildBlogPostMetadata(post, options = {}) {
  const { siteUrl = '' } = options;
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const metadata = {
    title: post.title,
    description: post.excerpt,
    authors: post.author ? [{ name: post.author.name }] : undefined,
    keywords: post.tags?.length > 0 ? post.tags : undefined,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: post.author?.name || 'Blog',
      locale: 'es_CO',
      publishedTime: post.publishedDate,
      modifiedTime: post.lastModified,
      section: post.category?.name,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };

  // Agregar imagen de portada
  if (post.coverImage?.url) {
    metadata.openGraph.images = [
      {
        url: post.coverImage.url,
        width: post.coverImage.width || 1200,
        height: post.coverImage.height || 630,
        alt: post.coverImage.alt,
      },
    ];
    metadata.twitter.images = [post.coverImage.url];
  }

  // Autor en OpenGraph
  if (post.author?.name) {
    metadata.openGraph.authors = [post.author.name];
  }

  return metadata;
}
