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
    id: rawExperience.sys?.id || crypto.randomUUID(),
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
