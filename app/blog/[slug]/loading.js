/**
 * Skeleton de carga para la página de post individual
 */
export default function BlogPostLoading() {
  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        {/* Back link skeleton */}
        <div className="h-5 w-32 bg-gray-200 rounded mb-8 animate-pulse" />

        {/* Header skeleton */}
        <header className="mb-8">
          <div className="h-6 w-24 bg-gray-200 rounded-full mb-4 animate-pulse" />
          <div className="h-12 w-full bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="h-10 w-3/4 bg-gray-200 rounded mb-4 animate-pulse" />

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="flex gap-2 mt-4">
            <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-5 w-12 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </header>

        {/* Cover image skeleton */}
        <div className="aspect-video bg-gray-200 rounded-xl mb-10 animate-pulse" />

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />

          <div className="h-8 w-2/3 bg-gray-200 rounded mt-8 animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />

          {/* Code block skeleton */}
          <div className="h-48 w-full bg-gray-800 rounded-lg mt-6 animate-pulse" />

          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Footer skeleton */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="h-12 w-40 bg-gray-200 rounded-lg mx-auto animate-pulse" />
          </div>
        </footer>
      </article>
    </main>
  );
}
