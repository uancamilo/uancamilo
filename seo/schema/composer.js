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
 * Construye un schema SoftwareSourceCode para un proyecto
 * @param {Object} project - Proyecto con datos de GitHub
 * @param {string} personId - ID de referencia a la persona
 * @returns {Object} Schema SoftwareSourceCode válido
 */
function buildProjectSchema(project, personId) {
  const schema = {
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: project.description,
    codeRepository: project.url,
    author: { '@id': personId },
  };

  if (project.language) {
    schema.programmingLanguage = project.language;
  }

  if (project.homepage) {
    schema.url = project.homepage;
  }

  return schema;
}

/**
 * Compone múltiples schemas en un único objeto JSON-LD con @graph
 * @param {Object} data - Datos normalizados para construir los schemas
 * @param {string[]} types - Lista de tipos de schema requeridos (ej: ['Person', 'WebSite'])
 * @param {Object} [options] - Opciones adicionales
 * @param {Array} [options.skills] - Array de skills (con name y url) para knowsAbout del schema Person
 * @param {Array} [options.education] - Array de formación académica para alumniOf del schema Person
 * @param {Array} [options.languages] - Array de idiomas para knowsLanguage del schema Person
 * @param {Array} [options.projects] - Array de proyectos de GitHub
 * @returns {Object} Objeto JSON-LD válido con @context y @graph
 */
export function composeSchemas(data, types, options = {}) {
  const { skills = [], education = [], languages = [], projects = [] } = options;

  // Enriquecer data con skills, education y languages para el schema Person
  const enrichedData = {
    ...data,
    ...(skills.length > 0 && { skills }),
    ...(education.length > 0 && { education }),
    ...(languages.length > 0 && { languages }),
  };

  const siteUrl = data.website || '';
  const personId = `${siteUrl}#person`;

  // Construir schemas principales
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

  // Agregar proyectos como SoftwareSourceCode
  if (projects.length > 0) {
    const projectSchemas = projects.map((project) => buildProjectSchema(project, personId));
    graph.push(...projectSchemas);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
