/**
 * Custom Image Loader para Contentful
 *
 * Aprovecha la API de imágenes de Contentful para optimización en su CDN.
 * Evita timeouts de Next.js Image Optimization y mejora performance.
 *
 * Parámetros soportados por Contentful:
 * - w: ancho
 * - h: alto
 * - q: calidad (1-100)
 * - fm: formato (webp, jpg, png, avif, gif)
 * - fit: ajuste (pad, fill, scale, crop, thumb)
 * - f: focus area para crop (center, top, right, left, bottom, faces)
 *
 * @see https://www.contentful.com/developers/docs/references/images-api/
 */
export default function contentfulImageLoader({ src, width, quality }) {
  // Si no es una URL de Contentful, retornar sin modificar
  if (!src.includes('ctfassets.net')) {
    return src;
  }

  const url = new URL(src);

  // Aplicar parámetros de optimización
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', (quality || 75).toString());
  url.searchParams.set('fm', 'webp');

  return url.toString();
}
