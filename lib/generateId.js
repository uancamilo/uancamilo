/**
 * Genera un ID único compatible con servidor y navegador.
 *
 * Usa crypto.randomUUID() si está disponible (Node.js, navegadores modernos),
 * con fallback a Math.random() para entornos sin soporte.
 *
 * @returns {string} ID único en formato UUID-like
 */
export function generateId() {
  // crypto.randomUUID() disponible en Node.js 19+ y navegadores modernos
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // Fallback para entornos sin crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
