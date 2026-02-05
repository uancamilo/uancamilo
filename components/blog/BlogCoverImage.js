import Link from 'next/link';
import Image from 'next/image';

/**
 * Imagen de portada reutilizable para posts del blog
 *
 * @param {Object} props
 * @param {Object} props.post - Post con coverImage, slug y title
 * @param {string} [props.sizes] - Atributo sizes para responsive images
 * @param {string} [props.className] - Clases adicionales para el contenedor
 */
export default function BlogCoverImage({
  post,
  sizes = '(max-width: 768px) 100vw, 33vw',
  className = '',
}) {
  if (!post?.coverImage) {
    return null;
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      title={`Leer: ${post.title}`}
      className={`block overflow-hidden ${className}`}
    >
      <div className="relative aspect-video">
        <Image
          src={post.coverImage.url}
          alt={post.coverImage.alt}
          title={post.title}
          fill
          sizes={sizes}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </Link>
  );
}
