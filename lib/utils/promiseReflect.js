/**
 * Envuelve una promesa para que siempre se resuelva, capturando el resultado o error.
 * Útil para Promise.all cuando se quiere continuar aunque algunas promesas fallen.
 *
 * @param {Promise} promise - La promesa a envolver
 * @returns {Promise<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>}
 */
export function reflect(promise) {
  return promise
    .then((value) => ({ status: 'fulfilled', value }))
    .catch((error) => ({ status: 'rejected', reason: error }));
}
