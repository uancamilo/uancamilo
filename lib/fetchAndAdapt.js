/**
 * Ejecuta un fetcher y transforma los datos con un adapter.
 * Maneja errores de forma consistente con logging en desarrollo.
 *
 * @param {Function} fetcher - Función que obtiene los datos crudos
 * @param {Function} adapter - Función que transforma los datos para la UI
 * @param {*} fallback - Valor por defecto si falla el fetching
 * @param {string} label - Etiqueta para identificar el error en logs
 * @returns {Promise<*>} Datos adaptados o fallback en caso de error
 */
export async function fetchAndAdapt(fetcher, adapter, { fallback = [], label = 'data' } = {}) {
  try {
    const rawData = await fetcher();
    return adapter(rawData);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error fetching ${label}:`, error);
    }
    return fallback;
  }
}
