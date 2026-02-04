/**
 * Nombres de meses en español (abreviados)
 */
const MONTHS_SHORT = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

/**
 * Nombres de meses en español (completos)
 */
const MONTHS_LONG = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

/**
 * Formatea una fecha ISO a formato corto en español
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string|null} Fecha formateada (ej: "Ene 2023")
 */
export function formatDate(dateString) {
  if (!dateString) return null;

  const date = new Date(dateString);
  return `${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Formatea una fecha ISO a formato largo en español
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} Fecha formateada (ej: "15 de enero de 2024")
 */
export function formatDateLong(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  return `${date.getDate()} de ${MONTHS_LONG[date.getMonth()]} de ${date.getFullYear()}`;
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
