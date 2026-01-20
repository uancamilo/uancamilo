import { getPersonalInfo } from '../services/contentful/personalInfo';
import { adaptPersonalInfo } from '../logic/personalInfo.logic';

/**
 * Route Handler para manifest.json (PWA)
 *
 * Genera el manifest dinámicamente consumiendo datos desde Contentful.
 * Sigue el mismo patrón que robots.js y sitemap.js.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default async function manifest() {
  let personalInfo;
  try {
    const rawData = await getPersonalInfo();
    personalInfo = adaptPersonalInfo(rawData);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching personal info for manifest:', error);
    }
    personalInfo = adaptPersonalInfo(null);
  }

  // Construir nombre para el manifest
  const name = personalInfo.title
    ? `${personalInfo.name} - ${personalInfo.title}`
    : personalInfo.name;

  // Usar iniciales para short_name si el nombre es muy largo
  const shortName = personalInfo.name.length > 12
    ? personalInfo.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : personalInfo.name;

  return {
    name,
    short_name: shortName,
    description: personalInfo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F9FAFB',
    theme_color: '#2563EB',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };
}
