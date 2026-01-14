import { getPersonalInfo } from '../services/contentful/personalInfo';
import { adaptPersonalInfo } from '../logic/personalInfo.logic';

/**
 * Genera el sitemap XML dinámicamente
 * @param {Object} params
 * @param {string} params.baseUrl - URL base del sitio
 * @param {Array} params.routes - Array de objetos con loc, lastmod, changefreq, priority
 * @returns {string} XML del sitemap
 */
function generateSitemapXML({ baseUrl, routes }) {
  const xmlRoutes = routes
    .map(
      (route) => `  <url>
    <loc>${baseUrl}${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlRoutes}
</urlset>`;
}

/**
 * Obtiene el dominio base del sitio
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
 * Obtiene todas las rutas del sitio
 * @returns {Array} Array de objetos de ruta
 */
function getRoutes() {
  const now = new Date().toISOString();

  const routes = [
    {
      loc: '/',
      lastmod: now,
      changefreq: 'daily',
      priority: '1.0',
    },
    // Futuras rutas dinámicas (blog posts, servicios, etc.)
    // Se agregarán aquí cuando estén implementadas
    // Ejemplo:
    // {
    //   loc: '/blog/post-slug',
    //   lastmod: post.updatedAt,
    //   changefreq: 'weekly',
    //   priority: '0.8',
    // },
  ];

  return routes;
}

export default function Sitemap() {
  // Este componente no renderiza nada
  // El sitemap se genera en getServerSideProps
  return null;
}

export async function getServerSideProps({ res }) {
  // Obtener información personal para derivar el dominio
  const reflect = (promise) =>
    promise
      .then((value) => ({ status: 'fulfilled', value }))
      .catch((error) => ({ status: 'rejected', reason: error }));

  const [personalInfoResult] = await Promise.all([reflect(getPersonalInfo())]);

  const rawPersonalInfo =
    personalInfoResult.status === 'fulfilled' ? personalInfoResult.value : null;

  const personalInfo = adaptPersonalInfo(rawPersonalInfo);

  // Obtener dominio base
  const baseUrl = getBaseUrl(personalInfo);

  // Obtener rutas
  const routes = getRoutes();

  // Generar XML
  const sitemap = generateSitemapXML({ baseUrl, routes });

  // Configurar headers
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
