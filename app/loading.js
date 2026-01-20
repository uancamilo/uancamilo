/**
 * Loading Skeleton para App Router
 *
 * Muestra un placeholder animado mientras se cargan los datos.
 * Replica la estructura de la página principal para evitar layout shift.
 */
export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <header>
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-center">
            {/* Imagen de perfil */}
            <div className="flex justify-center md:col-span-2">
              <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-gray-200" />
            </div>

            {/* Contenido textual */}
            <div className="text-center md:text-left md:col-span-3 space-y-4">
              {/* Nombre */}
              <div className="h-10 sm:h-12 lg:h-14 bg-gray-200 rounded-lg w-3/4 mx-auto md:mx-0" />
              {/* Título */}
              <div className="h-6 sm:h-7 bg-gray-200 rounded w-1/2 mx-auto md:mx-0" />
              {/* Summary */}
              <div className="space-y-3 mt-5">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
              </div>
            </div>
          </div>
        </section>
      </header>

      {/* Main Content Skeleton */}
      <main>
        <section className="py-12 border-t border-gray-200">
          {/* Título de sección */}
          <div className="h-8 bg-gray-200 rounded w-40 mb-8" />

          {/* Grid de tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm"
              >
                {/* Cargo */}
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                {/* Empresa */}
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                {/* Ubicación */}
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-4" />
                {/* Fechas */}
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4" />
                {/* Descripción */}
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-4/5" />
                </div>
                {/* Tecnologías */}
                <div className="flex gap-2 mt-5">
                  <div className="h-6 bg-gray-200 rounded w-16" />
                  <div className="h-6 bg-gray-200 rounded w-20" />
                  <div className="h-6 bg-gray-200 rounded w-14" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Skeleton */}
      <footer>
        <section className="pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Info de contacto */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="h-4 bg-gray-200 rounded w-40" />
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
            {/* Redes sociales */}
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 bg-gray-200 rounded" />
              <div className="w-5 h-5 bg-gray-200 rounded" />
              <div className="w-5 h-5 bg-gray-200 rounded" />
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}
