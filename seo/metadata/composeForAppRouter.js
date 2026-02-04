import { buildBaseMetadata } from './buildBaseMetadata';
import { buildCanonicalMetadata } from './buildCanonicalMetadata';
import { buildOpenGraphMetadata } from './buildOpenGraphMetadata';
import { buildTwitterMetadata } from './buildTwitterMetadata';

/**
 * Transforma la metadata de los builders existentes al formato de Next.js App Router generateMetadata
 *
 * Esta función actúa como adapter entre el sistema de builders existente
 * y la API de metadata del App Router, preservando la lógica de negocio
 * mientras genera el formato correcto.
 *
 * @param {Object} data - Datos normalizados del adapter personalInfo
 * @param {Object} [options] - Opciones adicionales
 * @param {string} [options.path='/'] - Path de la página para canonical y og:url
 * @param {Array} [options.skills=[]] - Array de skills para incluir en keywords
 * @returns {Object} Objeto de metadata compatible con generateMetadata de App Router
 *
 * @example
 * // En app/page.js
 * export async function generateMetadata() {
 *   const personalInfo = await getAndAdaptPersonalInfo();
 *   const skills = await getAndAdaptSkills();
 *   return composeMetadataForAppRouter(personalInfo, { path: '/', skills });
 * }
 */
export function composeMetadataForAppRouter(data, options = {}) {
  const { path = '/', skills = [] } = options;

  // Obtener metadata de cada builder
  const base = buildBaseMetadata(data);
  const canonical = buildCanonicalMetadata(data, path);
  const og = buildOpenGraphMetadata(data, path);
  const twitter = buildTwitterMetadata(data);

  // Construir objeto de metadata para App Router
  const metadata = {};

  // Base metadata (con fallback si Contentful no responde)
  if (base) {
    metadata.title = base.title;
    metadata.description = base.description;
  } else {
    metadata.title = 'CV Profesional';
    metadata.description = 'Portafolio y currículum profesional';
  }

  // Robots - permitir indexación y seguimiento de enlaces
  metadata.robots = {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };

  // Publisher
  if (data?.name && !data.name.includes('no disponible')) {
    metadata.publisher = data.name;
  }

  // Author
  if (data?.name && !data.name.includes('no disponible')) {
    metadata.authors = [
      {
        name: data.name,
        url: data.website || undefined,
      },
    ];
  }

  // Keywords basadas en título profesional y skills
  const skillNames = skills.map((skill) => skill.name).filter(Boolean);
  const baseKeywords = data?.title && !data.title.includes('no disponible')
    ? [data.title, data.name]
    : [];
  const allKeywords = [...baseKeywords, ...skillNames].filter(Boolean);

  if (allKeywords.length > 0) {
    metadata.keywords = allKeywords;
  }

  // Canonical URL
  if (canonical?.canonical) {
    metadata.alternates = {
      canonical: canonical.canonical,
    };
  }

  // Open Graph - transformar de formato plano a estructurado
  if (og) {
    metadata.openGraph = {
      type: og['og:type'],
      siteName: og['og:site_name'],
      title: og['og:title'],
      description: og['og:description'],
      locale: og['og:locale'],
    };

    if (og['og:url']) {
      metadata.openGraph.url = og['og:url'];
    }

    if (og['og:image']) {
      metadata.openGraph.images = [
        {
          url: og['og:image'],
          width: og['og:image:width'],
          height: og['og:image:height'],
        },
      ];
    }
  }

  // Twitter Cards - transformar de formato plano a estructurado
  if (twitter) {
    metadata.twitter = {
      title: twitter['twitter:title'],
      description: twitter['twitter:description'],
    };

    if (twitter['twitter:creator']) {
      metadata.twitter.creator = twitter['twitter:creator'];
    }

    if (twitter['twitter:card']) {
      metadata.twitter.card = twitter['twitter:card'];
    }

    if (twitter['twitter:image']) {
      metadata.twitter.images = [twitter['twitter:image']];
    }
  }

  return metadata;
}
