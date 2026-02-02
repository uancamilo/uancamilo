import Link from 'next/link';

/**
 * Página 404 personalizada
 * Se muestra cuando una ruta no existe o se llama notFound()
 */
export default function NotFound() {
  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-blue-600 mb-4">404</p>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Página no encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ir al inicio
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Ver blog
          </Link>
        </div>
      </div>
    </main>
  );
}
