import { getPersonalInfo } from '../services/contentful/personalInfo';
import { adaptPersonalInfo } from '../logic/personalInfo.logic';
import { composeSchemas } from '../seo/schema/composer';
import { composeMetadataForAppRouter } from '../seo/metadata/composeForAppRouter';

import ProfileHeader from '../components/sections/ProfileHeader';
import ContactSection from '../components/sections/ContactSection';

/**
 * Obtiene y adapta la información personal desde Contentful
 * Función auxiliar reutilizable para data fetching y metadata
 */
async function getAndAdaptPersonalInfo() {
  try {
    const rawData = await getPersonalInfo();
    return adaptPersonalInfo(rawData);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching personal info:', error);
    }
    return adaptPersonalInfo(null);
  }
}

/**
 * Genera metadata SEO para la página usando App Router API
 * Reutiliza los builders existentes a través del composer
 */
export async function generateMetadata() {
  const personalInfo = await getAndAdaptPersonalInfo();
  return composeMetadataForAppRouter(personalInfo, { path: '/' });
}

/**
 * Componente para inyectar JSON-LD schema en el head
 * Server Component - se renderiza en servidor
 */
function JsonLdSchema({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

/**
 * Home Page - Server Component
 *
 * Esta página:
 * - Hace data fetching directamente en el servidor (sin getStaticProps)
 * - Renderiza como Server Component por defecto
 * - Inyecta JSON-LD schemas para SEO
 * - Pasa datos a componentes de presentación
 */
export default async function HomePage() {
  // Data fetching directo en Server Component
  const personalInfo = await getAndAdaptPersonalInfo();

  // Componer schemas JSON-LD para SEO
  const schemaData = composeSchemas(personalInfo, ['Person', 'WebSite']);

  return (
    <>
      <JsonLdSchema data={schemaData} />
      <main id="cv-content">
        <ProfileHeader personalInfo={personalInfo} />
        <ContactSection personalInfo={personalInfo} />
      </main>
    </>
  );
}

/**
 * Configuración de revalidación para ISR (Incremental Static Regeneration)
 * Revalida el contenido cada hora (3600 segundos)
 */
export const revalidate = 3600;
