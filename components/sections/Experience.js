import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

/**
 * ExperienceCard - Tarjeta individual de experiencia con timeline integrado
 *
 * Cada tarjeta incluye:
 * - Punto de timeline arriba con fechas
 * - Línea conectora al siguiente (excepto el último)
 * - Contenido de la experiencia
 */
function ExperienceCard({ experience, isFirst, isLast }) {
  const {
    company,
    position,
    dateRange,
    duration,
    location,
    description,
    technologies,
    isCurrent,
  } = experience;

  return (
    <div className="flex flex-col">
      {/* Timeline point + connector */}
      <div className="flex items-center mb-4">
        {/* Línea izquierda (no en el primero) */}
        <div className={`flex-1 h-1 ${isFirst ? 'bg-transparent' : 'bg-indigo-200'}`} />

        {/* Punto central */}
        <div className="flex flex-col items-center mx-2">
          <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${
            isCurrent ? 'bg-green-500' : 'bg-indigo-500'
          }`} />
        </div>

        {/* Línea derecha (no en el último) */}
        <div className={`flex-1 h-1 ${isLast ? 'bg-transparent' : 'bg-indigo-200'}`} />
      </div>

      {/* Fecha centrada debajo del punto */}
      <div className="text-center mb-3">
        <p className="text-sm font-medium text-gray-700">{dateRange}</p>
        {duration && <p className="text-xs text-gray-500">{duration}</p>}
      </div>

      {/* Tarjeta de contenido */}
      <article className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm flex-grow flex flex-col">
        {/* Badge Actual */}
        {isCurrent && (
          <span className="self-start mb-2 inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Actual
          </span>
        )}

        {/* Cargo */}
        <h3 className="text-lg font-semibold text-gray-900">{position}</h3>

        {/* Empresa */}
        <p className="mt-1 text-base text-gray-700">{company}</p>

        {/* Location */}
        {location && (
          <p className="mt-1 text-sm text-gray-500">{location}</p>
        )}

        {/* Description - Rich Text */}
        {description?.json && (
          <div className="mt-3 text-sm leading-relaxed text-gray-600 space-y-2 flex-grow">
            {documentToReactComponents(description.json)}
          </div>
        )}

        {/* Technologies - Tags azul/indigo */}
        {technologies?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}

/**
 * Experience - Sección de experiencia laboral
 *
 * Layout con timeline horizontal integrado en tarjetas:
 * - Cada tarjeta tiene su punto de timeline arriba
 * - Líneas conectan los puntos horizontalmente
 * - Grid responsive (1 col mobile, 2+ cols desktop)
 * - Timeline conectado visualmente con cada experiencia
 */
export default function Experience({ experiences }) {
  // No renderizar si no hay experiencias
  if (!experiences || experiences.length === 0) {
    return null;
  }

  // Determinar columnas según cantidad de experiencias
  const gridCols = experiences.length === 1
    ? 'grid-cols-1 max-w-xl mx-auto'
    : experiences.length === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section
      aria-labelledby="experience-heading"
      className="py-12 border-t border-gray-200"
    >
      <h2
        id="experience-heading"
        className="text-2xl font-semibold text-gray-900 mb-8"
      >
        Experiencia
      </h2>

      {/* Grid de tarjetas con timeline integrado */}
      <div className={`grid ${gridCols} gap-4`}>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            isFirst={index === 0}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
