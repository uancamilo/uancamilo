import Image from 'next/image';
import Link from 'next/link';
import BlogCategoryBadge from './BlogCategoryBadge';
import ShareButtons from './ShareButtons';
import { renderBlogRichText } from '../../lib/renderBlogRichText';

/**
 * Icono de flecha hacia atrás
 */
function ArrowLeftIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  );
}

/**
 * Icono de reloj
 */
function ClockIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

/**
 * Contenido completo de un post del blog
 *
 * @param {Object} props
 * @param {Object} props.post - Post completo adaptado
 * @param {string} props.postUrl - URL completa del artículo para compartir
 */
export default async function BlogPostContent({ post, postUrl }) {
  // Renderizar el contenido Rich Text con syntax highlighting
  const content = post.content ? await renderBlogRichText(post.content) : null;

  return (
    <article className="max-w-3xl mx-auto">
      {/* Enlace para volver */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Volver al blog</span>
      </Link>

      {/* Encabezado del post */}
      <header className="mb-8">
        {/* Categoría */}
        {post.category && (
          <div className="mb-4">
            <BlogCategoryBadge
              name={post.category.name}
              slug={post.category.slug}
            />
          </div>
        )}

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        {/* Meta información */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          {/* Autor */}
          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="font-medium">{post.author.name}</span>
            </div>
          )}

          {/* Fecha */}
          <time dateTime={post.publishedDate} className="text-sm">
            {post.publishedDateFormatted}
          </time>

          {/* Tiempo de lectura */}
          {post.readingTime && (
            <div className="flex items-center gap-1 text-sm">
              <ClockIcon className="w-4 h-4" />
              <span>{post.readingTime} min de lectura</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <BlogCategoryBadge key={tag} name={tag} isTag size="sm" />
            ))}
          </div>
        )}

        {/* Botones de compartir - Header */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <ShareButtons
            url={postUrl}
            title={post.title}
            excerpt={post.excerpt}
            variant="compact"
          />
        </div>
      </header>

      {/* Imagen de portada */}
      {post.coverImage && (
        <figure className="mb-10 -mx-4 sm:mx-0">
          <div className="relative aspect-video sm:rounded-xl overflow-hidden">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority
            />
          </div>
        </figure>
      )}

      {/* Contenido del post */}
      <div className="prose-blog">
        {content}
      </div>

      {/* Footer del post */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        {/* Botones de compartir - Footer */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <p className="text-gray-600 text-sm">¿Te gustó este artículo? Compártelo</p>
          <ShareButtons
            url={postUrl}
            title={post.title}
            excerpt={post.excerpt}
          />
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Volver al blog</span>
          </Link>
        </div>
      </footer>
    </article>
  );
}
