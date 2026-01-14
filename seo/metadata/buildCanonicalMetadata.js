/**
 * Builder para canonical URL
 * @param {Object} data - Datos normalizados
 * @param {string} [data.website] - URL base del sitio
 * @param {string} [path] - Path específico de la página (ej: '/blog/post-1'). Default: '/'
 * @returns {Object|null} Objeto con canonical, o null si no se puede construir
 */
export function buildCanonicalMetadata(data, path = '/') {
  if (!data?.website) {
    return null;
  }

  // Limpiar trailing slash de la base
  const baseUrl = data.website.endsWith('/')
    ? data.website.slice(0, -1)
    : data.website;

  // Asegurar que path empiece con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return {
    canonical: `${baseUrl}${normalizedPath}`,
  };
}
