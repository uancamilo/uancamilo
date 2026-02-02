import { notFound } from 'next/navigation';
import { getCachedBlogPost, getCachedBlogSlugs, getRelatedPosts } from '../../../lib/blogData';
import { getCachedPersonalInfo } from '../../../lib/data';
import BlogPostContent from '../../../components/blog/BlogPostContent';
import RelatedPosts from '../../../components/blog/RelatedPosts';
import { buildBlogPostMetadata } from '../../../seo/metadata/buildBlogMetadata';
import { buildBlogPostingSchema } from '../../../seo/schema/blogPosting.schema';

export const revalidate = 3600; // Revalidar cada hora

/**
 * Valida que el slug sea un string válido para URLs
 * Solo permite letras minúsculas, números y guiones
 * @param {string} slug - Slug a validar
 * @returns {boolean} True si es válido
 */
function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') return false;
  if (slug.length > 200) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Genera los parámetros estáticos para pre-renderizar posts
 */
export async function generateStaticParams() {
  const slugs = await getCachedBlogSlugs();
  return slugs.map((item) => ({ slug: item.slug }));
}

/**
 * Genera metadata para el post individual
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!isValidSlug(slug)) {
    return {
      title: 'Post no encontrado',
      description: 'El artículo solicitado no existe.',
    };
  }

  const [post, personalInfo] = await Promise.all([
    getCachedBlogPost(slug),
    getCachedPersonalInfo(),
  ]);

  if (!post) {
    return {
      title: 'Post no encontrado',
      description: 'El artículo solicitado no existe.',
    };
  }

  const siteUrl = personalInfo.website || '';
  return buildBlogPostMetadata(post, { siteUrl });
}

/**
 * Página de post individual del blog
 */
export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  if (!isValidSlug(slug)) {
    notFound();
  }

  const [post, personalInfo] = await Promise.all([
    getCachedBlogPost(slug),
    getCachedPersonalInfo(),
  ]);

  if (!post) {
    notFound();
  }

  // Obtener posts relacionados
  const relatedPosts = await getRelatedPosts(post, 3);

  const siteUrl = personalInfo.website || '';

  // JSON-LD para el post
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [buildBlogPostingSchema(post, { siteUrl })],
  };

  // URL completa del artículo para compartir
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <BlogPostContent post={post} postUrl={postUrl} />

        {/* Posts relacionados */}
        <div className="max-w-3xl mx-auto">
          <RelatedPosts posts={relatedPosts} />
        </div>
      </main>
    </>
  );
}
