import { buildPersonSchema } from './person.schema';
import { buildWebSiteSchema } from './website.schema';
import { buildProfilePageSchema } from './profilePage.schema';

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
  ProfilePage: buildProfilePageSchema,
};

/**
 * Compone múltiples schemas en un único objeto JSON-LD con @graph
 * @param {Object} data - Datos normalizados para construir los schemas
 * @param {string[]} types - Lista de tipos de schema requeridos (ej: ['Person', 'WebSite'])
 * @param {Object} [options] - Opciones adicionales
 * @param {Array} [options.skills] - Array de skills (con name y url) para knowsAbout del schema Person
 * @param {Array} [options.education] - Array de formación académica para alumniOf del schema Person
 * @returns {Object} Objeto JSON-LD válido con @context y @graph
 */
export function composeSchemas(data, types, options = {}) {
  const { skills = [], education = [] } = options;

  // Enriquecer data con skills y education para el schema Person
  const enrichedData = {
    ...data,
    ...(skills.length > 0 && { skills }),
    ...(education.length > 0 && { education }),
  };

  const graph = types
    .map((type) => {
      const builder = schemaBuilders[type];
      if (!builder) {
        console.warn(`Schema builder para "${type}" no encontrado`);
        return null;
      }
      return builder(enrichedData);
    })
    .filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
