import Link from 'next/link';
import BlogCategoryBadge from './BlogCategoryBadge';
import BlogCoverImage from './BlogCoverImage';

/**
 * Componente para mostrar posts relacionados
 *
 * @param {Object} props
 * @param {Array} props.posts - Array de posts relacionados
 */
export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Posts relacionados
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Imagen de portada */}
            <BlogCoverImage
              post={post}
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* Contenido */}
            <div className="p-4">
              {/* Categoría */}
              {post.category && (
                <div className="mb-2">
                  <BlogCategoryBadge
                    name={post.category.name}
                    slug={post.category.slug}
                    size="sm"
                  />
                </div>
              )}

              {/* Título */}
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                <Link href={`/blog/${post.slug}`} title={`Leer: ${post.title}`}>
                  {post.title}
                </Link>
              </h3>

              {/* Tags en común (indicador visual) */}
              {post.relevance > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  {post.relevance} {post.relevance === 1 ? 'tag en común' : 'tags en común'}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
