/**
 * Builder para schema WebSite de Schema.org
 * @param {Object} data - Datos normalizados del sitio
 * @param {string} data.name - Nombre del sitio/autor
 * @param {string} data.description - Descripción del sitio
 * @param {string} data.website - URL del sitio
 * @param {string} [data.inLanguage] - Código de idioma (default: es-CO)
 * @returns {Object} Schema WebSite válido
 */
export function buildWebSiteSchema(data) {
  const siteUrl = data.website || '';

  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: data.name,
    description: data.description,
    inLanguage: data.inLanguage || 'es-CO',
    author: {
      '@id': `${siteUrl}#person`,
    },
  };
}
