/**
 * Route Handler para robots.txt
 *
 * En App Router, robots.js exporta una función default que retorna
 * un objeto con la configuración. Next.js lo transforma automáticamente
 * en el formato robots.txt estándar.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Advertir en producción si no está configurada la URL
  if (!siteUrl && process.env.NODE_ENV === 'production') {
    console.warn('NEXT_PUBLIC_SITE_URL no está configurada. robots.txt usará localhost.');
  }

  const finalUrl = siteUrl || 'http://localhost:3000';

  // Normalizar URL (sin trailing slash)
  const baseUrl = finalUrl.endsWith('/') ? finalUrl.slice(0, -1) : finalUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
