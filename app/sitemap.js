import { getPersonalInfo } from '../services/contentful/personalInfo';
import { adaptPersonalInfo } from '../logic/personalInfo.logic';
import { getCachedBlogSlugs } from '../lib/blogData';

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

  // Fallback: localhost (advertir en producción)
  if (process.env.NODE_ENV === 'production') {
    console.warn('NEXT_PUBLIC_SITE_URL no está configurada. sitemap.xml usará localhost.');
  }
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

  // Usar fecha de última publicación de Contentful, o fecha actual como fallback
  const lastModified = personalInfo?.lastModified
    ? new Date(personalInfo.lastModified)
    : new Date();

  // Rutas estáticas actuales
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Rutas dinámicas del blog
  let blogRoutes = [];
  try {
    const blogSlugs = await getCachedBlogSlugs();
    blogRoutes = blogSlugs.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.lastModified ? new Date(post.lastModified) : lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching blog slugs for sitemap:', error);
    }
  }

  return [
    ...staticRoutes,
    ...blogRoutes,
  ];
}
