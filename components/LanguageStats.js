export default function LanguageStats({ languages }) {
  if (!languages || Object.keys(languages).length === 0) {
    return <div>Cargando estadísticas de lenguajes...</div>;
  }

  const totalBytes = Object.values(languages).reduce(
    (sum, bytes) => sum + bytes,
    0
  );
  const languagePercentages = Object.entries(languages)
    .map(([lang, bytes]) => ({
      name: lang,
      bytes,
      percentage: ((bytes / totalBytes) * 100).toFixed(1),
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8);

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3776ab',
      Java: '#ed8b00',
      'C++': '#00599c',
      CSS: '#1572b6',
      HTML: '#e34f26',
      PHP: '#777bb4',
      Go: '#00add8',
      Rust: '#000000',
      Swift: '#fa7343',
      Kotlin: '#7f52ff',
      Dart: '#0175c2',
      Ruby: '#cc342d',
      Shell: '#89e051',
      Vue: '#4fc08d',
      React: '#61dafb',
    };
    return colors[language] || '#6b7280';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Lenguajes de Programación
      </h2>

      <div className="mb-6">
        <div className="flex h-4 bg-gray-200 rounded-full overflow-hidden">
          {languagePercentages.map((lang, index) => (
            <div
              key={lang.name}
              className="h-full"
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: getLanguageColor(lang.name),
              }}
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {languagePercentages.map((lang) => (
          <div key={lang.name} className="flex items-center">
            <span
              className="w-3 h-3 rounded-full mr-3"
              style={{ backgroundColor: getLanguageColor(lang.name) }}
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">
                  {lang.name}
                </span>
                <span className="text-sm text-gray-500">
                  {lang.percentage}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
