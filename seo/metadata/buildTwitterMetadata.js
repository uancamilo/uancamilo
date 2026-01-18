/**
 * Builder para Twitter Cards metadata
 * @param {Object} data - Datos normalizados del adapter
 * @param {string} data.name - Nombre de la persona
 * @param {string} data.title - Título profesional
 * @param {string} data.description - Descripción
 * @param {Object} [data.profileImage] - Imagen de perfil
 * @param {string} [data.profileImage.url] - URL de la imagen
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

  // Agregar imagen y card type solo si existe imagen
  if (data.profileImage?.url) {
    metadata['twitter:card'] = 'summary_large_image';
    metadata['twitter:image'] = data.profileImage.url;
  }

  return metadata;
}
