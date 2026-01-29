import Link from 'next/link';

/**
 * Icono de búsqueda
 */
function SearchIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

/**
 * Encabezado del blog con título, buscador y filtro de categorías
 *
 * @param {Object} props
 * @param {Array} props.categories - Lista de categorías del blog
 * @param {string|null} props.activeCategory - Slug de la categoría activa
 * @param {string|null} props.searchQuery - Término de búsqueda actual
 * @param {number} props.postCount - Número total de posts mostrados
 */
export default function BlogHeader({ categories, activeCategory, searchQuery, postCount }) {
  return (
    <header className="mb-10">
      {/* Título y descripción */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Blog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Artículos, apuntes y recursos sobre programación y tecnología.
        </p>
      </div>

      {/* Buscador */}
      <form
        action="/blog"
        method="GET"
        className="max-w-xl mx-auto mb-8"
      >
        {/* Mantener la categoría activa en la búsqueda */}
        {activeCategory && (
          <input type="hidden" name="categoria" value={activeCategory} />
        )}

        <div className="relative">
          <input
            type="search"
            name="q"
            defaultValue={searchQuery || ''}
            placeholder="Buscar en título, contenido, tags..."
            className="w-full px-4 py-3 pl-12 text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            aria-label="Buscar artículos"
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>

      {/* Indicador de búsqueda activa */}
      {searchQuery && (
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Resultados para: <span className="font-semibold">&ldquo;{searchQuery}&rdquo;</span>
            <Link
              href={activeCategory ? `/blog?categoria=${activeCategory}` : '/blog'}
              className="ml-2 text-blue-600 hover:underline"
            >
              Limpiar búsqueda
            </Link>
          </p>
        </div>
      )}

      {/* Filtro de categorías */}
      {categories.length > 0 && (
        <nav aria-label="Filtrar por categoría" className="flex flex-wrap justify-center gap-3">
          <Link
            href={searchQuery ? `/blog?q=${encodeURIComponent(searchQuery)}` : '/blog'}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${!activeCategory
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            Todos
            <span className="ml-1.5 text-xs opacity-75">
              ({postCount})
            </span>
          </Link>

          {categories.map((category) => (
            <Link
              key={category.slug}
              href={searchQuery
                ? `/blog?categoria=${category.slug}&q=${encodeURIComponent(searchQuery)}`
                : `/blog?categoria=${category.slug}`
              }
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeCategory === category.slug
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
