import { formatDate, calculateDuration } from '../lib/dateUtils';
import { generateId } from '../lib/generateId';

/**
 * Transforma una educación cruda de Contentful a formato de UI
 * @param {Object} rawEducation - Educación cruda desde Contentful
 * @returns {Object} Educación transformada para la UI
 */
function adaptEducationItem(rawEducation) {
  if (!rawEducation) return null;

  const startFormatted = formatDate(rawEducation.startDate);
  const endFormatted = rawEducation.endDate ? formatDate(rawEducation.endDate) : 'Actual';
  const duration = calculateDuration(rawEducation.startDate, rawEducation.endDate);

  return {
    id: rawEducation.sys?.id || generateId(),
    institution: rawEducation.institution || 'Institución no especificada',
    degree: rawEducation.degree || 'Título no especificado',
    startDate: rawEducation.startDate,
    endDate: rawEducation.endDate,
    dateRange: startFormatted && endFormatted ? `${startFormatted} - ${endFormatted}` : '',
    duration,
    location: rawEducation.location || null,
    description: rawEducation.description || null,
    certification: rawEducation.certification?.url || null,
    isCurrent: !rawEducation.endDate,
  };
}

/**
 * Transforma un array de educación cruda de Contentful a formato de UI
 * @param {Array} rawEducation - Array de educación desde Contentful
 * @returns {Array} Array de educación transformada
 */
export function adaptEducation(rawEducation) {
  if (!rawEducation || !Array.isArray(rawEducation)) {
    return [];
  }

  return rawEducation.map(adaptEducationItem).filter(Boolean);
}
