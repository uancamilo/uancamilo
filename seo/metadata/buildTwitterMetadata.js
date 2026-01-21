/**
 * Extrae el handle de Twitter/X de una URL
 * @param {string} url - URL del perfil de Twitter/X
 * @returns {string|null} Handle con @ o null
 */
function extractTwitterHandle(url) {
  if (!url) return null;

  // Patrones: twitter.com/usuario, x.com/usuario
  const match = url.match(/(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/i);
  return match ? `@${match[1]}` : null;
}

/**
 * Builder para Twitter Cards metadata
 * @param {Object} data - Datos normalizados del adapter
 * @param {string} data.name - Nombre de la persona
 * @param {string} data.title - Título profesional
 * @param {string} data.description - Descripción
 * @param {Object} [data.profileImage] - Imagen de perfil
 * @param {string} [data.profileImage.url] - URL de la imagen
 * @param {Array} [data.socialLinks] - Links a redes sociales
 * @returns {Object|null} Objeto con Twitter metadata, o null si faltan datos requeridos
 */
export function buildTwitterMetadata(data) {
  // Validar datos requeridos
  if (!data?.name || !data?.description) {
    return null;
  }

  const twitterTitle = data.title ? `${data.name} | ${data.title}` : data.name;

  const metadata = {
    'twitter:title': twitterTitle,
    'twitter:description': data.description,
  };

  // Extraer handle de Twitter/X de socialLinks
  const twitterLink = data.socialLinks?.find(
    ({ name }) => name.toLowerCase() === 'twitter' || name.toLowerCase() === 'x'
  );
  const handle = extractTwitterHandle(twitterLink?.url);
  if (handle) {
    metadata['twitter:creator'] = handle;
  }

  // Agregar imagen y card type solo si existe imagen
  if (data.profileImage?.url) {
    metadata['twitter:card'] = 'summary_large_image';
    metadata['twitter:image'] = data.profileImage.url;
  }

  return metadata;
}
