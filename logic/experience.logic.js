import { formatDate, calculateDuration } from '../lib/dateUtils';
import { generateId } from '../lib/generateId';

/**
 * Transforma una experiencia cruda de Contentful a formato de UI
 * @param {Object} rawExperience - Experiencia cruda desde Contentful
 * @returns {Object} Experiencia transformada para la UI
 */
function adaptExperience(rawExperience) {
  if (!rawExperience) return null;

  const startFormatted = formatDate(rawExperience.startDate);
  const endFormatted = rawExperience.endDate ? formatDate(rawExperience.endDate) : 'Actual';
  const duration = calculateDuration(rawExperience.startDate, rawExperience.endDate);

  return {
    id: rawExperience.sys?.id || generateId(),
    company: rawExperience.company || 'Empresa no especificada',
    position: rawExperience.position || 'Cargo no especificado',
    startDate: rawExperience.startDate,
    endDate: rawExperience.endDate,
    dateRange: startFormatted && endFormatted ? `${startFormatted} - ${endFormatted}` : '',
    duration,
    location: rawExperience.location || null,
    description: rawExperience.description || null,
    technologies: Array.isArray(rawExperience.technologies)
      ? rawExperience.technologies
      : [],
    isCurrent: !rawExperience.endDate,
  };
}

/**
 * Transforma un array de experiencias crudas de Contentful a formato de UI
 * @param {Array} rawExperiences - Array de experiencias desde Contentful
 * @returns {Array} Array de experiencias transformadas
 */
export function adaptExperiences(rawExperiences) {
  if (!rawExperiences || !Array.isArray(rawExperiences)) {
    return [];
  }

  return rawExperiences.map(adaptExperience).filter(Boolean);
}
