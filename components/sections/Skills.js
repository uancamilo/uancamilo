/**
 * SkillBar - Barra de progreso individual para una skill
 *
 * Muestra el nombre, nivel, descripción y features de la skill.
 */
function SkillBar({ skill }) {
  if (!skill) return null;

  const { name, level, description, features = [], url } = skill;

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm space-y-2">
      <div className="flex justify-between items-center">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Más información sobre ${name}`}
            className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline transition-colors"
            aria-label={`Ir a ${name}`}
          >
            {name}
          </a>
        ) : (
          <span className="text-sm font-medium text-gray-900">{name}</span>
        )}
        <span className="text-sm text-gray-600">Dominio: {level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${level}%` }}
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name}: ${level}%`}
        />
      </div>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      {Array.isArray(features) && features.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-xs text-gray-500">Conocimiento:</span>
          {features.map((feature, index) => (
            <span
              key={`${name}-feature-${index}`}
              className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * SkillGroup - Grupo de skills por categoría
 */
function SkillGroup({ group }) {
  if (!group) return null;

  const { label, skills = [] } = group;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <SkillBar key={skill?.id || `${label}-skill-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

/**
 * Skills - Sección de habilidades técnicas
 *
 * Layout:
 * - Agrupadas por categoría
 * - Grid responsive (1 col mobile, 2 cols tablet, 3 cols desktop)
 * - Cada skill muestra nombre y barra de progreso con nivel
 * - Datos consumidos desde Contentful
 */
export default function Skills({ skillGroups }) {
  if (!skillGroups || skillGroups.length === 0) {
    return null;
  }

  return (
    <section
      id="habilidades"
      aria-labelledby="skills-heading"
      className="py-12 border-t border-gray-200 scroll-mt-16"
    >
      <h2
        id="skills-heading"
        className="text-2xl font-semibold text-gray-900 mb-8"
      >
        Habilidades
      </h2>

      <div className="space-y-10">
        {skillGroups.map((group) => (
          <SkillGroup key={group.category} group={group} />
        ))}
      </div>
    </section>
  );
}
