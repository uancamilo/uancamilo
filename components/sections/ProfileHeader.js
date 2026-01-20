import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

/**
 * ProfileHeader - Hero Section estilo editorial/CV
 *
 * Layout responsive:
 * - Mobile: Imagen arriba centrada, texto centrado debajo
 * - Desktop (md+): Grid 2 columnas - imagen izquierda, texto derecha
 *
 * Este layout usa el ancho completo del contenedor editorial (max-w-5xl)
 * definido en layout.js, permitiendo un diseño tipo portada de CV.
 *
 * Datos desde Contentful vía props:
 * - name → h1 principal
 * - title → subtítulo profesional
 * - summary → descripción (rich text)
 * - profileImage → imagen circular
 */
export default function ProfileHeader({ personalInfo }) {
  const { name, title, summary, profileImage } = personalInfo;

  return (
    <section className="relative isolate py-8 sm:py-12 lg:py-16">
      {/* Grid: 1 columna en mobile, 5 columnas asimétricas en desktop (2:3) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-center">
        {/* Columna izquierda: Imagen de perfil (2/5 del ancho) */}
        {profileImage?.url && (
          <div className="flex justify-center md:col-span-2">
            <Image
              src={profileImage.url}
              alt={`Foto de ${name}`}
              width={240}
              height={240}
              className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full object-cover ring-4 ring-white shadow-xl"
              priority
            />
          </div>
        )}

        {/* Columna derecha: Contenido textual (3/5 del ancho) */}
        <div className="text-center md:text-left md:col-span-3">
          {/* Nombre */}
          <h1 className="text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl lg:text-5xl">
            {name}
          </h1>

          {/* Título profesional */}
          {title && (
            <p className="mt-3 text-lg font-semibold text-pretty text-gray-700 sm:text-xl">
              {title}
            </p>
          )}

          {/* Summary - texto editorial */}
          {summary?.json && (
            <div className="mt-5 space-y-3 text-base leading-relaxed text-gray-600 sm:text-lg">
              {documentToReactComponents(summary.json)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
