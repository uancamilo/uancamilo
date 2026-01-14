/**
 * Builder para schema Person de Schema.org
 * @param {Object} data - Datos normalizados de la persona
 * @param {string} data.name - Nombre completo
 * @param {string} data.jobTitle - Título profesional
 * @param {string} data.email - Email de contacto
 * @param {string} data.phone - Teléfono de contacto
 * @param {string} data.location - Ciudad/Localidad
 * @param {string} data.website - URL del sitio web
 * @param {string[]} [data.sameAs] - URLs de perfiles sociales
 * @param {string[]} [data.knowsAbout] - Áreas de conocimiento
 * @returns {Object} Schema Person válido
 */
export function buildPersonSchema(data) {
  const siteUrl = data.website || '';

  const schema = {
    '@type': 'Person',
    '@id': `${siteUrl}#person`,
    name: data.name,
    url: siteUrl,
  };

  if (data.jobTitle) {
    schema.jobTitle = data.jobTitle;
  }

  if (data.email) {
    schema.email = data.email;
  }

  if (data.phone) {
    schema.telephone = data.phone;
  }

  if (data.location) {
    schema.address = {
      '@type': 'PostalAddress',
      addressLocality: data.location,
      addressCountry: {
        '@type': 'Country',
        name: 'CO',
      },
    };
  }

  if (data.sameAs?.length > 0) {
    schema.sameAs = data.sameAs;
  }

  if (data.knowsAbout?.length > 0) {
    schema.knowsAbout = data.knowsAbout;
  }

  return schema;
}
