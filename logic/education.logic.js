/**
 * Formatea una fecha para mostrar en el CV
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} Fecha formateada (ej: "Ene 2023")
 */
function formatDate(dateString) {
  if (!dateString) return null;

  const date = new Date(dateString);
  const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Calcula la duración entre dos fechas
 * @param {string} startDate - Fecha de inicio en formato ISO
 * @param {string|null} endDate - Fecha de fin en formato ISO (null = actual)
 * @returns {string} Duración formateada (ej: "2 años 3 meses")
 */
function calculateDuration(startDate, endDate) {
  if (!startDate) return '';

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();

  if (months < 1) return '< 1 mes';

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts = [];
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'año' : 'años'}`);
  }
  if (remainingMonths > 0) {
    parts.push(`${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`);
  }

  return parts.join(' ');
}

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
    id: rawEducation.sys?.id || crypto.randomUUID(),
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
