/**
 * Formatea una fecha ISO a formato legible en español
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string|null} Fecha formateada (ej: "Ene 2023")
 */
export function formatDate(dateString) {
  if (!dateString) return null;

  const date = new Date(dateString);
  const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Calcula la duración entre dos fechas en formato legible
 * @param {string} startDate - Fecha de inicio en formato ISO
 * @param {string|null} endDate - Fecha de fin en formato ISO (null = actual)
 * @returns {string} Duración formateada (ej: "2 años 3 meses")
 */
export function calculateDuration(startDate, endDate) {
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
