/**
 * Skeleton de carga para la página de lista del blog
 */
export default function BlogLoading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <header className="mb-10">
        <div className="text-center mb-8">
          <div className="h-10 w-32 bg-gray-200 rounded-lg mx-auto mb-3 animate-pulse" />
          <div className="h-6 w-96 max-w-full bg-gray-200 rounded mx-auto animate-pulse" />
        </div>

        {/* Categories skeleton */}
        <div className="flex flex-wrap justify-center gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
            />
          ))}
        </div>
      </header>

      {/* Posts grid skeleton */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <article
            key={i}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
          >
            {/* Image skeleton */}
            <div className="aspect-video bg-gray-200 animate-pulse" />

            {/* Content skeleton */}
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>

              <div className="h-7 w-full bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded mb-1 animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-4 animate-pulse" />

              <div className="flex gap-2 mb-4">
                <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-5 w-12 bg-gray-200 rounded-full animate-pulse" />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
