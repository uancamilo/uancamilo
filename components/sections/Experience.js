import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

/**
 * ExperienceCard - Tarjeta individual de experiencia laboral
 *
 * Estructura en 3 secciones:
 * 1. Institución: Cargo, Empresa, Ubicación
 * 2. Tiempo: Fechas y duración (como metadata)
 * 3. Funciones: Descripción extensa + Tecnologías
 */
function ExperienceCard({ experience }) {
  if (!experience) return null;

  const {
    company,
    position,
    dateRange,
    duration,
    location,
    description,
    technologies = [],
    isCurrent,
  } = experience;

  return (
    <article className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm flex flex-col">
      {/* SECCIÓN 1: Institución */}
      <div className="mb-4">
        {/* Cargo - Lo más prominente */}
        <h3 className="text-lg font-semibold text-gray-900">{position}</h3>

        {/* Empresa */}
        <p className="mt-1 text-base font-medium text-gray-700">{company}</p>

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
              Actual
            </span>
          </>
        )}
      </div>

      {/* SECCIÓN 3: Funciones y Tecnologías */}
      <div className="flex-grow">
        {/* Descripción - Rich Text extenso */}
        {description?.json && (
          <div className="text-sm leading-relaxed text-gray-600 space-y-3">
            {documentToReactComponents(description.json)}
          </div>
        )}

        {/* Tecnologías */}
        {Array.isArray(technologies) && technologies.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500">Tecnologías:</span>
            {technologies.map((tech, index) => (
              <span
                key={`${position}-tech-${index}`}
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/**
 * Experience - Sección de experiencia laboral
 *
 * Layout:
 * - Grid responsive (1 col mobile, 2 cols tablet, 3 cols desktop)
 * - Tarjetas con jerarquía: Rol → Empresa → Tiempo → Funciones
 * - Ordenadas por fecha descendente (más reciente primero)
 */
export default function Experience({ experiences }) {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  const gridCols =
    experiences.length === 1
      ? 'grid-cols-1 max-w-xl mx-auto'
      : experiences.length === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section
      id="experiencia"
      aria-labelledby="experience-heading"
      className="py-12 border-t border-gray-200 scroll-mt-16"
    >
      <h2
        id="experience-heading"
        className="text-2xl font-semibold text-gray-900 mb-8"
      >
        Experiencia
      </h2>

      <div className={`grid ${gridCols} gap-6`}>
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience?.id || `experience-${index}`} experience={experience} />
        ))}
      </div>
    </section>
  );
}
