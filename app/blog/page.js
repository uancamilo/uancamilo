import Link from 'next/link';
import { getCachedBlogPosts, getCachedBlogCategories } from '../../lib/blogData';
import { getCachedPersonalInfo } from '../../lib/data';
import BlogHeader from '../../components/blog/BlogHeader';
import BlogPostCard from '../../components/blog/BlogPostCard';
import { buildBlogListMetadata } from '../../seo/metadata/buildBlogMetadata';
import { composeSchemas } from '../../seo/schema/composer';

export const revalidate = 3600; // Revalidar cada hora

/**
 * Genera metadata para la página del blog
 */
export async function generateMetadata({ searchParams }) {
  const personalInfo = await getCachedPersonalInfo();
  const categories = await getCachedBlogCategories();
  const params = await searchParams;
  const categorySlug = params?.categoria || null;

  // Encontrar el nombre de la categoría activa
  const activeCategory = categories.find((c) => c.slug === categorySlug);
  const categoryName = activeCategory?.name || null;

  const siteUrl = personalInfo.website || '';

  return buildBlogListMetadata(personalInfo, { siteUrl, categoryName });
}

/**
 * Página de lista del blog
 */
export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const categorySlug = params?.categoria || null;
  const searchQuery = params?.q || null;

  // Obtener datos en paralelo
  const [posts, categories, personalInfo] = await Promise.all([
    getCachedBlogPosts({ categorySlug, searchQuery }),
    getCachedBlogCategories(),
    getCachedPersonalInfo(),
  ]);

  const siteUrl = personalInfo.website || '';

  // JSON-LD para la página del blog
  const jsonLd = composeSchemas(
    personalInfo,
    ['Blog', 'BlogContainer'],
    { siteUrl, posts }
  );

  // Mensaje para estado vacío
  const getEmptyMessage = () => {
    if (searchQuery && categorySlug) {
      return `No se encontraron artículos para "${searchQuery}" en esta categoría.`;
    }
    if (searchQuery) {
      return `No se encontraron artículos para "${searchQuery}".`;
    }
    if (categorySlug) {
      return 'No hay artículos en esta categoría todavía.';
    }
    return 'No hay artículos publicados todavía.';
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <BlogHeader
          categories={categories}
          activeCategory={categorySlug}
          searchQuery={searchQuery}
          postCount={posts.length}
        />

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-6">
              {getEmptyMessage()}
            </p>
            {(searchQuery || categorySlug) && (
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Limpiar filtros
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
