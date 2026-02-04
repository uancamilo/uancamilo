/**
 * EducationCard - Tarjeta individual de formación académica
 *
 * Estructura en 3 secciones (consistente con ExperienceCard):
 * 1. Institución: Título, Institución, Ubicación
 * 2. Tiempo: Fechas y duración (como metadata)
 * 3. Descripción: Logros o información adicional
 */
function EducationCard({ education }) {
  if (!education) return null;

  const {
    institution,
    degree,
    dateRange,
    duration,
    location,
    description,
    certification,
    isCurrent,
  } = education;

  return (
    <article className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm flex flex-col">
      {/* SECCIÓN 1: Institución */}
      <div className="mb-4">
        {/* Título - Lo más prominente */}
        <h3 className="text-lg font-semibold text-gray-900">{degree}</h3>

        {/* Institución */}
        <p className="mt-1 text-base font-medium text-gray-700">
          {institution}
        </p>

        {/* Ubicación */}
        {location && <p className="mt-1 text-sm text-gray-600">{location}</p>}
      </div>

      {/* SECCIÓN 2: Tiempo (metadata) */}
      <div className="mb-4 flex items-center gap-3 text-sm text-gray-600">
        <span>{dateRange}</span>
        {duration && (
          <>
            <span className="text-gray-300">·</span>
            <span>{duration}</span>
          </>
        )}
        {isCurrent && (
          <>
            <span className="text-gray-300">·</span>
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
              En curso
            </span>
          </>
        )}
      </div>

      {/* SECCIÓN 3: Descripción */}
      {description && (
        <div className="flex-grow">
          <p className="text-sm leading-relaxed text-gray-600">{description}</p>
        </div>
      )}

      {/* SECCIÓN 4: Certificado */}
      {certification && (
        <div className="mt-4">
          <a
            href={certification}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver certificado de ${degree} (abre en nueva pestaña)`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            Ver certificado
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      )}
    </article>
  );
}

/**
 * Education - Sección de formación académica
 *
 * Layout:
 * - Grid responsive (1 col mobile, 2 cols tablet, 3 cols desktop)
 * - Tarjetas con jerarquía: Título → Institución → Tiempo → Descripción
 * - Ordenadas por fecha descendente (más reciente primero)
 */
export default function Education({ education }) {
  if (!education || education.length === 0) {
    return null;
  }

  return (
    <section
      id="formacion"
      aria-labelledby="education-heading"
      className="py-12 border-t border-gray-200 scroll-mt-16"
    >
      <h2
        id="education-heading"
        className="text-2xl font-semibold text-gray-900 mb-8"
      >
        Formación Académica
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((item, index) => (
          <EducationCard key={item?.id || `education-${index}`} education={item} />
        ))}
      </div>
    </section>
  );
}
