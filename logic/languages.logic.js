import { generateId } from '../lib/generateId';

/**
 * Mapeo de niveles a etiquetas legibles
 */
const levelLabels = {
  nativo: 'Nativo',
  avanzado: 'Avanzado',
  intermedio: 'Intermedio',
  basico: 'Básico',
};

/**
 * Transforma un idioma crudo de Contentful a formato de UI
 * @param {Object} rawLanguage - Idioma crudo desde Contentful
 * @returns {Object} Idioma transformado para la UI
 */
function adaptLanguageItem(rawLanguage) {
  if (!rawLanguage) return null;

  const levelKey = rawLanguage.level?.toLowerCase() || '';
  const levelLabel = levelLabels[levelKey] || rawLanguage.level || 'No especificado';

  return {
    id: rawLanguage.sys?.id || generateId(),
    name: rawLanguage.name || 'Idioma no especificado',
    level: levelLabel,
    levelKey,
    percentage: rawLanguage.percentage || null,
    certification: rawLanguage.certification?.url || null,
    order: rawLanguage.order || 0,
  };
}

/**
 * Transforma un array de idiomas crudos de Contentful a formato de UI
 * @param {Array} rawLanguages - Array de idiomas desde Contentful
 * @returns {Array} Array de idiomas transformados
 */
export function adaptLanguages(rawLanguages) {
  if (!rawLanguages || !Array.isArray(rawLanguages)) {
    return [];
  }

  return rawLanguages.map(adaptLanguageItem).filter(Boolean);
}
