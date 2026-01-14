import { buildPersonSchema } from './person.schema';
import { buildWebSiteSchema } from './website.schema';

/**
 * Registro de builders disponibles
 * Para agregar un nuevo schema:
 * 1. Crear el builder en /seo/schema/[tipo].schema.js
 * 2. Importarlo aquí
 * 3. Agregarlo a este objeto
 */
const schemaBuilders = {
  Person: buildPersonSchema,
  WebSite: buildWebSiteSchema,
};

/**
 * Compone múltiples schemas en un único objeto JSON-LD con @graph
 * @param {Object} data - Datos normalizados para construir los schemas
 * @param {string[]} types - Lista de tipos de schema requeridos (ej: ['Person', 'WebSite'])
 * @returns {Object} Objeto JSON-LD válido con @context y @graph
 */
export function composeSchemas(data, types) {
  const graph = types
    .map((type) => {
      const builder = schemaBuilders[type];
      if (!builder) {
        console.warn(`Schema builder para "${type}" no encontrado`);
        return null;
      }
      return builder(data);
    })
    .filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
