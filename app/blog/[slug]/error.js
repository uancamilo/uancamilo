'use client';

import Link from 'next/link';

/**
 * Error boundary para la página de post individual
 */
export default function BlogPostError({ error, reset }) {
  // Solo mostrar detalles del error en desarrollo
  const errorMessage = process.env.NODE_ENV === 'development' && error?.message
    ? error.message
    : 'Ocurrió un error inesperado. Por favor, intenta de nuevo.';

  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Error al cargar el artículo
        </h1>
        <p className="text-gray-600 mb-8">
          {errorMessage}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/blog"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Volver al blog
          </Link>
        </div>
      </div>
    </main>
  );
}
