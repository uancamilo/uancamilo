import Link from 'next/link';
import Image from 'next/image';
import BlogCategoryBadge from './BlogCategoryBadge';
import BlogCoverImage from './BlogCoverImage';

/**
 * Tarjeta de post para la lista del blog
 *
 * @param {Object} props
 * @param {Object} props.post - Post adaptado del blog
 */
export default function BlogPostCard({ post }) {
  return (
    <article className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Imagen de portada */}
      <BlogCoverImage
        post={post}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Contenido */}
      <div className="p-5">
        {/* Categoría y fecha */}
        <div className="flex items-center gap-3 mb-3">
          {post.category && (
            <BlogCategoryBadge
              name={post.category.name}
              slug={post.category.slug}
              size="sm"
            />
          )}
          <time
            dateTime={post.publishedDate}
            className="text-sm text-gray-500"
          >
            {post.publishedDateShort}
          </time>
        </div>

        {/* Título */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.slug}`} title={`Leer: ${post.title}`}>
            {post.title}
          </Link>
        </h2>

        {/* Extracto */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <BlogCategoryBadge
                key={tag}
                name={tag}
                isTag
                size="sm"
              />
            ))}
          </div>
        )}

        {/* Footer con autor y tiempo de lectura */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  title={`Autor: ${post.author.name}`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-gray-600">{post.author.name}</span>
            </div>
          )}

          {post.readingTime && (
            <span className="text-sm text-gray-500">
              {post.readingTime} min de lectura
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
