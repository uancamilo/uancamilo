/**
 * Builder para metadata básica SEO (title, description)
 * @param {Object} data - Datos normalizados
 * @param {string} [data.name] - Nombre de la persona/entidad
 * @param {string} [data.title] - Título profesional
 * @param {string} [data.description] - Descripción
 * @returns {Object|null} Objeto con title y description, o null si no hay datos válidos
 */
export function buildBaseMetadata(data) {
  if (!data) {
    return null;
  }

  // Validar que existan datos mínimos válidos (no placeholders)
  const hasValidName = data.name && !data.name.includes('no disponible');
  const hasValidTitle = data.title && !data.title.includes('no disponible');
  const hasValidDescription = data.description && !data.description.includes('no disponible');

  // Si no hay datos suficientes para metadata profesional, retornar null
  if (!hasValidName || !hasValidDescription) {
    return null;
  }

  const metadata = {};

  // Construir title: combinar name + title si existe
  if (hasValidTitle) {
    metadata.title = `${data.name} | ${data.title}`;
  } else {
    metadata.title = data.name;
  }

  // Description
  metadata.description = data.description;

  return metadata;
}
