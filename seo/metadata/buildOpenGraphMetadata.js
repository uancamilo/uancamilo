/**
 * Builder para Open Graph metadata
 * @param {Object} data - Datos normalizados del adapter
 * @param {string} data.name - Nombre de la persona
 * @param {string} data.title - Título profesional
 * @param {string} data.description - Descripción
 * @param {string} [data.website] - URL base del sitio
 * @param {Object} [data.profileImage] - Imagen de perfil
 * @param {string} [data.profileImage.url] - URL de la imagen
 * @param {number} [data.profileImage.width] - Ancho de la imagen
 * @param {number} [data.profileImage.height] - Alto de la imagen
 * @param {string} [path] - Path específico de la página. Default: '/'
 * @returns {Object|null} Objeto con Open Graph metadata, o null si faltan datos requeridos
 */
export function buildOpenGraphMetadata(data, path = '/') {
  // Validar datos requeridos
  if (!data?.name || !data?.description) {
    return null;
  }

  const ogTitle = data.title ? `${data.name} | ${data.title}` : data.name;

  const metadata = {
    'og:type': 'website',
    'og:site_name': data.name,
    'og:title': ogTitle,
    'og:description': data.description,
    'og:locale': 'es_CO',
  };

  // Construir og:url si hay website
  if (data.website) {
    const baseUrl = data.website.endsWith('/')
      ? data.website.slice(0, -1)
      : data.website;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    metadata['og:url'] = `${baseUrl}${normalizedPath}`;
  }

  // Agregar imagen solo si existe
  if (data.profileImage?.url) {
    metadata['og:image'] = data.profileImage.url;

    if (data.profileImage.width) {
      metadata['og:image:width'] = data.profileImage.width;
    }

    if (data.profileImage.height) {
      metadata['og:image:height'] = data.profileImage.height;
    }
  }

  return metadata;
}
