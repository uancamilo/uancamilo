import { buildBaseMetadata } from './buildBaseMetadata';
import { buildCanonicalMetadata } from './buildCanonicalMetadata';
import { buildOpenGraphMetadata } from './buildOpenGraphMetadata';
import { buildTwitterMetadata } from './buildTwitterMetadata';

/**
 * Registro de metadata builders disponibles
 * Para agregar nueva metadata:
 * 1. Crear el builder en /seo/metadata/[tipo].js
 * 2. Importarlo aquí
 * 3. Agregarlo a este objeto
 */
const metadataBuilders = {
  base: buildBaseMetadata,
  canonical: buildCanonicalMetadata,
  openGraph: buildOpenGraphMetadata,
  twitter: buildTwitterMetadata,
};

/**
 * Compone múltiples metadata builders en un único objeto
 * @param {Object} data - Datos normalizados para construir la metadata
 * @param {Array} types - Lista de tipos de metadata requeridos (ej: ['base', 'canonical'])
 * @param {Object} [options] - Opciones adicionales para builders específicos
 * @param {string} [options.path] - Path para canonical URL
 * @returns {Object} Objeto con toda la metadata combinada
 */
export function composeMetadata(data, types, options = {}) {
  const metadata = {};

  types.forEach((type) => {
    const builder = metadataBuilders[type];

    if (!builder) {
      console.warn(`Metadata builder para "${type}" no encontrado`);
      return;
    }

    let result;

    // Algunos builders necesitan opciones adicionales
    if (type === 'canonical' || type === 'openGraph') {
      result = builder(data, options.path);
    } else {
      result = builder(data);
    }

    // Ignorar resultados null (builders que no pudieron construir metadata)
    if (result) {
      Object.assign(metadata, result);
    }
  });

  return metadata;
}
