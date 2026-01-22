import { FaStar, FaCodeBranch, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

/**
 * ProjectCard - Tarjeta individual de proyecto
 *
 * Estructura:
 * 1. Nombre y descripción
 * 2. Metadata: lenguaje, stars, forks, actualización
 * 3. Topics como tags
 * 4. Links: repositorio y demo
 */
function ProjectCard({ project }) {
  const {
    name,
    description,
    language,
    stars,
    forks,
    topics,
    url,
    homepage,
    updatedAtFormatted,
  } = project;

  return (
    <article className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm flex flex-col">
      {/* SECCIÓN 1: Nombre y descripción */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>

      {/* SECCIÓN 2: Metadata */}
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
        {language && (
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-500" aria-hidden="true" />
            {language}
          </span>
        )}
        {stars > 0 && (
          <span className="flex items-center gap-1">
            <FaStar className="w-4 h-4 text-yellow-500" aria-hidden="true" />
            {stars}
          </span>
        )}
        {forks > 0 && (
          <span className="flex items-center gap-1">
            <FaCodeBranch className="w-4 h-4" aria-hidden="true" />
            {forks}
          </span>
        )}
        {updatedAtFormatted && (
          <>
            <span className="text-gray-300">·</span>
            <span>Actualizado: {updatedAtFormatted}</span>
          </>
        )}
      </div>

      {/* SECCIÓN 3: Topics */}
      {topics.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-1">
          <span className="text-xs text-gray-500">Topics:</span>
          {topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* SECCIÓN 4: Links */}
      <div className="mt-auto pt-4 flex items-center gap-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          <FaGithub className="w-4 h-4" aria-hidden="true" />
          Repositorio
        </a>
        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <FaExternalLinkAlt className="w-4 h-4" aria-hidden="true" />
            Demo
          </a>
        )}
      </div>
    </article>
  );
}

/**
 * Projects - Sección de proyectos desde GitHub
 *
 * Layout:
 * - Grid responsive (1 col mobile, 2 cols tablet+)
 * - Tarjetas con info del repositorio
 * - Links a repo y demo
 */
export default function Projects({ projects }) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="projects-heading"
      className="py-12 border-t border-gray-200"
    >
      <h2
        id="projects-heading"
        className="text-2xl font-semibold text-gray-900 mb-8"
      >
        Proyectos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
