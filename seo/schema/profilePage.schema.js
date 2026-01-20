/**
 * Builder para schema ProfilePage de Schema.org
 * Indica a Google que esta es una página de perfil profesional
 *
 * @param {Object} data - Datos normalizados de la persona
 * @param {string} data.name - Nombre completo
 * @param {string} data.website - URL del sitio web
 * @param {string} data.description - Descripción del perfil
 * @returns {Object} Schema ProfilePage válido
 *
 * @see https://schema.org/ProfilePage
 */
export function buildProfilePageSchema(data) {
  const siteUrl = data.website || '';

  return {
    '@type': 'ProfilePage',
    '@id': `${siteUrl}#profilepage`,
    url: siteUrl,
    name: data.name,
    description: data.description,
    mainEntity: {
      '@id': `${siteUrl}#person`,
    },
    isPartOf: {
      '@id': `${siteUrl}#website`,
    },
  };
}
