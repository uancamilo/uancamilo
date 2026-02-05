import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Mapeo de Content Types de Contentful a rutas que deben revalidarse.
 * Cuando se actualiza un tipo de contenido, se invalidan las rutas asociadas.
 */
const CONTENT_TYPE_PATHS = {
  // Blog
  blogPost: ['/blog', '/sitemap.xml'],
  blogCategory: ['/blog'],

  // CV / Portfolio
  personalInfo: ['/', '/sitemap.xml'],
  experience: ['/'],
  skills: ['/'],
  education: ['/'],
  languages: ['/'],
};

/**
 * Extrae el slug del blog post del payload de Contentful
 * @param {Object} payload - Payload del webhook
 * @returns {string|null} Slug del post o null
 */
function extractBlogSlug(payload) {
  // El slug puede estar en fields.slug (formato de webhook)
  const fields = payload?.fields;
  if (!fields?.slug) return null;

  // Contentful envía campos localizados: { slug: { 'en-US': 'my-slug' } }
  const slug = fields.slug;
  if (typeof slug === 'string') return slug;
  if (typeof slug === 'object') {
    // Obtener el primer valor del objeto localizado
    return Object.values(slug)[0] || null;
  }
  return null;
}

/**
 * API Route para On-Demand Revalidation via Contentful Webhook
 *
 * Configurar en Contentful:
 * 1. Settings → Webhooks → Add Webhook
 * 2. URL: https://tu-dominio.com/api/revalidate?secret=TU_SECRET
 * 3. Triggers: Entry (publish, unpublish), Asset (publish, unpublish)
 * 4. Headers: Content-Type: application/json
 *
 * @see https://nextjs.org/docs/app/building-your-application/caching#on-demand-revalidation
 */
export async function POST(request) {
  try {
    // 1. Validar secret token
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (!process.env.REVALIDATE_SECRET) {
      console.error('REVALIDATE_SECRET no está configurado');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret token' },
        { status: 401 }
      );
    }

    // 2. Parsear payload de Contentful
    const payload = await request.json();

    // Contentful envía el Content Type ID en sys.contentType.sys.id
    const contentTypeId = payload?.sys?.contentType?.sys?.id;

    if (!contentTypeId) {
      // Si no hay contentType, podría ser un Asset u otro tipo
      // Revalidar rutas principales por seguridad
      revalidatePath('/');
      revalidatePath('/blog');

      return NextResponse.json({
        revalidated: true,
        paths: ['/', '/blog'],
        reason: 'No content type detected, revalidated main paths',
      });
    }

    // 3. Determinar rutas a revalidar
    const pathsToRevalidate = CONTENT_TYPE_PATHS[contentTypeId] || [];

    // Si es un blogPost, también revalidar la ruta específica del post
    if (contentTypeId === 'blogPost') {
      const slug = extractBlogSlug(payload);
      if (slug) {
        pathsToRevalidate.push(`/blog/${slug}`);
      }
    }

    // 4. Revalidar las rutas
    if (pathsToRevalidate.length === 0) {
      return NextResponse.json({
        revalidated: false,
        reason: `Content type '${contentTypeId}' not mapped to any paths`,
      });
    }

    const revalidatedPaths = [];
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path);
        revalidatedPaths.push(path);
      } catch (err) {
        console.error(`Error revalidating ${path}:`, err);
      }
    }

    console.log(`Revalidated paths for ${contentTypeId}:`, revalidatedPaths);

    return NextResponse.json({
      revalidated: true,
      contentType: contentTypeId,
      paths: revalidatedPaths,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint para verificar que la ruta está funcionando
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'Invalid secret token' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    status: 'ok',
    message: 'Revalidation endpoint is working',
    timestamp: new Date().toISOString(),
  });
}
