import fs from 'fs';
import path from 'path';
import { getPersonalInfo } from '../services/contentful/personalInfo';
import { adaptPersonalInfo } from '../logic/personalInfo.logic';
import { getCachedBlogSlugs } from '../lib/blogData';

/**
 * Obtiene la URL base del sitio
 * Prioridad: personalInfo.website > NEXT_PUBLIC_SITE_URL > localhost
 */
function getBaseUrl(personalInfo) {
  if (personalInfo?.website) {
    return personalInfo.website.endsWith('/')
      ? personalInfo.website.slice(0, -1)
      : personalInfo.website;
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL;
    return url.endsWith('/') ? url.slice(0, -1) : url;
  }

  if (process.env.NODE_ENV === 'production') {
    console.warn('NEXT_PUBLIC_SITE_URL no está configurada. sitemap.xml usará localhost.');
  }
  return 'http://localhost:3000';
}

/**
 * Escanea el directorio /app y encuentra todas las rutas estáticas
 * Excluye: api/, rutas dinámicas [param], archivos especiales
 */
function getStaticRoutes(appDir) {
  const routes = [];

  // Carpetas/archivos a ignorar
  const ignore = ['api', 'not-found.js', 'error.js', 'loading.js', 'layout.js', 'sitemap.js', 'robots.js', 'manifest.js'];

  function scanDir(dir, urlPath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    // Verificar si esta carpeta tiene page.js (es una ruta válida)
    const hasPage = entries.some(
      (e) => e.isFile() && (e.name === 'page.js' || e.name === 'page.tsx')
    );

    if (hasPage) {
      routes.push(urlPath || '/');
    }

    // Escanear subcarpetas
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const name = entry.name;

      // Ignorar carpetas especiales
      if (ignore.includes(name)) continue;

      // Ignorar rutas dinámicas [param] y grupos (group)
      if (name.startsWith('[') || name.startsWith('(')) continue;

      const newUrlPath = `${urlPath}/${name}`;
      const newDir = path.join(dir, name);

      scanDir(newDir, newUrlPath);
    }
  }

  scanDir(appDir);
  return routes;
}

/**
 * Asigna prioridad basada en la profundidad de la ruta
 */
function getPriority(route) {
  if (route === '/') return 1.0;
  const depth = route.split('/').filter(Boolean).length;
  // Más profundo = menor prioridad (mínimo 0.5)
  return Math.max(0.5, 1.0 - depth * 0.1);
}

/**
 * Asigna frecuencia de cambio basada en la ruta
 */
function getChangeFrequency(route) {
  if (route === '/') return 'weekly';
  if (route === '/blog') return 'daily';
  if (route === '/contacto') return 'monthly';
  return 'weekly';
}

/**
 * Route Handler para sitemap.xml
 * Genera dinámicamente las rutas escaneando /app
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

  const lastModified = personalInfo?.lastModified
    ? new Date(personalInfo.lastModified)
    : new Date();

  // Escanear /app para rutas estáticas
  const appDir = path.join(process.cwd(), 'app');
  const staticPaths = getStaticRoutes(appDir);

  const staticRoutes = staticPaths.map((route) => ({
    url: route === '/' ? baseUrl : `${baseUrl}${route}`,
    lastModified,
    changeFrequency: getChangeFrequency(route),
    priority: getPriority(route),
  }));

  // Rutas dinámicas del blog (desde Contentful)
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

  return [...staticRoutes, ...blogRoutes];
}
