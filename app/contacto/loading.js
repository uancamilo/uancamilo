/**
 * Skeleton de carga para la página de contacto
 */
export default function ContactLoading() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-10">
          <div className="h-10 w-40 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-80 max-w-full bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
          <div className="h-5 w-64 max-w-full bg-gray-200 rounded mx-auto animate-pulse" />
        </div>

        {/* Form skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {/* Campo nombre */}
          <div className="mb-6">
            <div className="h-4 w-16 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-11 w-full bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Campo email */}
          <div className="mb-6">
            <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-11 w-full bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Campo mensaje */}
          <div className="mb-6">
            <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-32 w-full bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Botón enviar */}
          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Info adicional skeleton */}
        <div className="mt-8 text-center">
          <div className="h-4 w-72 max-w-full bg-gray-200 rounded mx-auto animate-pulse" />
        </div>
      </div>
    </main>
  );
}
