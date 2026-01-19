import { getPersonalInfo } from '../services/contentful/personalInfo';
import { adaptPersonalInfo } from '../logic/personalInfo.logic';

/**
 * Obtiene la URL base del sitio
 * Prioridad: personalInfo.website > NEXT_PUBLIC_SITE_URL > localhost
 *
 * @param {Object} personalInfo - Información personal adaptada
 * @returns {string} URL base sin trailing slash
 */
function getBaseUrl(personalInfo) {
  // Prioridad 1: personalInfo.website desde Contentful
  if (personalInfo?.website) {
    return personalInfo.website.endsWith('/')
      ? personalInfo.website.slice(0, -1)
      : personalInfo.website;
  }

  // Prioridad 2: Variable de entorno
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL;
    return url.endsWith('/') ? url.slice(0, -1) : url;
  }

  // Fallback: localhost (solo para desarrollo)
  return 'http://localhost:3000';
}

/**
 * Route Handler para sitemap.xml
 *
 * En App Router, sitemap.js exporta una función default que retorna
 * un array de objetos de URL. Next.js los transforma automáticamente
 * en el formato sitemap XML estándar.
 *
 * Para agregar rutas dinámicas (blog, proyectos), expandir esta función
 * para obtener los slugs desde Contentful y generar entradas adicionales.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap() {
  // Obtener datos para construir URL base
  let personalInfo;
  try {
    const rawData = await getPersonalInfo();
    personalInfo = adaptPersonalInfo(rawData);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching personal info for sitemap:', error);
    }
    personalInfo = adaptPersonalInfo(null);
  }

  const baseUrl = getBaseUrl(personalInfo);
  const now = new Date();

  // Rutas estáticas actuales
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Futuras rutas dinámicas (blog, proyectos, etc.)
  // Ejemplo de cómo agregar rutas de blog:
  //
  // const blogPosts = await getBlogPosts();
  // const blogRoutes = blogPosts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly',
  //   priority: 0.8,
  // }));

  return [
    ...staticRoutes,
    // ...blogRoutes, // Descomentar cuando exista blog
  ];
}
