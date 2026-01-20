'use client';

import Link from 'next/link';

/**
 * Error Boundary para App Router
 *
 * Se muestra cuando ocurre un error en la página.
 * Proporciona opciones de recuperación sin exponer detalles técnicos.
 */
// eslint-disable-next-line no-unused-vars
export default function Error({ error, reset }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Algo salió mal
        </h1>
        <p className="text-gray-600 mb-8">
          Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta de
          nuevo o vuelve al inicio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
