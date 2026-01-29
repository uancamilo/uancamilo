import Link from 'next/link';

/**
 * Badge para mostrar categoría o tag del blog
 *
 * @param {Object} props
 * @param {string} props.name - Nombre de la categoría/tag
 * @param {string} [props.slug] - Slug para enlace (solo categorías)
 * @param {boolean} [props.isTag] - Si es un tag (estilo diferente)
 * @param {boolean} [props.isActive] - Si está activo (en filtro)
 * @param {string} [props.size] - Tamaño: 'sm' | 'md' (default: 'md')
 */
export default function BlogCategoryBadge({
  name,
  slug,
  isTag = false,
  isActive = false,
  size = 'md',
}) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const baseClasses = `
    inline-flex items-center rounded-full font-medium transition-colors
    ${sizeClasses[size]}
  `;

  // Tags tienen estilo más sutil
  if (isTag) {
    return (
      <span className={`${baseClasses} bg-gray-100 text-gray-600`}>
        {name}
      </span>
    );
  }

  // Categorías pueden ser enlaces con estado activo
  const categoryClasses = isActive
    ? 'bg-blue-600 text-white'
    : 'bg-blue-50 text-blue-700 hover:bg-blue-100';

  if (slug) {
    return (
      <Link
        href={`/blog?categoria=${slug}`}
        className={`${baseClasses} ${categoryClasses}`}
      >
        {name}
      </Link>
    );
  }

  return (
    <span className={`${baseClasses} ${categoryClasses}`}>
      {name}
    </span>
  );
}
