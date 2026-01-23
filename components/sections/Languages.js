/**
 * LanguageCard - Tarjeta individual de idioma
 *
 * Muestra:
 * - Nombre del idioma
 * - Nivel de dominio con badge de color
 * - Barra de progreso (si hay porcentaje)
 * - Certificación si existe
 */
function LanguageCard({ language }) {
  if (!language) return null;

  const { name, level, levelKey, percentage, certification } = language;

  // Colores según el nivel
  const levelColors = {
    nativo: 'bg-green-100 text-green-700',
    avanzado: 'bg-blue-100 text-blue-700',
    intermedio: 'bg-yellow-100 text-yellow-700',
    basico: 'bg-gray-100 text-gray-700',
  };

  const progressColors = {
    nativo: 'bg-green-600',
    avanzado: 'bg-blue-600',
    intermedio: 'bg-yellow-500',
    basico: 'bg-gray-500',
  };

  const colorClass = levelColors[levelKey] || 'bg-gray-100 text-gray-700';
  const progressColor = progressColors[levelKey] || 'bg-gray-500';

  return (
    <article className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${colorClass}`}
        >
          {level}
        </span>
      </div>

      {percentage && (
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">
              Dominio: {percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${progressColor} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${name}: ${percentage}%`}
            />
          </div>
        </div>
      )}

      {certification && (
        <div className="mt-3">
          <a
            href={certification}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver certificación de ${name}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            Ver certificación
          </a>
        </div>
      )}
    </article>
  );
}

/**
 * Languages - Sección de idiomas
 *
 * Layout:
 * - Grid responsive (1 col mobile, 2 cols tablet+)
 * - Tarjetas con nombre y nivel
 * - Ordenadas por el campo order de Contentful
 */
export default function Languages({ languages }) {
  if (!languages || languages.length === 0) {
    return null;
  }

  return (
    <section
      id="idiomas"
      aria-labelledby="languages-heading"
      className="py-12 border-t border-gray-200 scroll-mt-16"
    >
      <h2
        id="languages-heading"
        className="text-2xl font-semibold text-gray-900 mb-8"
      >
        Idiomas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {languages.map((language, index) => (
          <LanguageCard key={language?.id || `language-${index}`} language={language} />
        ))}
      </div>
    </section>
  );
}
