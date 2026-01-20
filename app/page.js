import { getPersonalInfo } from '../services/contentful/personalInfo';
import { getExperiences } from '../services/contentful/experience';
import { adaptPersonalInfo } from '../logic/personalInfo.logic';
import { adaptExperiences } from '../logic/experience.logic';
import { composeSchemas } from '../seo/schema/composer';
import { composeMetadataForAppRouter } from '../seo/metadata/composeForAppRouter';

import ProfileHeader from '../components/sections/ProfileHeader';
import ContactSection from '../components/sections/ContactSection';
import Experience from '../components/sections/Experience';

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
 * Obtiene y adapta las experiencias laborales desde Contentful
 */
async function getAndAdaptExperiences() {
  try {
    const rawData = await getExperiences();
    return adaptExperiences(rawData);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching experiences:', error);
    }
    return [];
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
  // Data fetching paralelo en Server Component
  const [personalInfo, experiences] = await Promise.all([
    getAndAdaptPersonalInfo(),
    getAndAdaptExperiences(),
  ]);

  // Componer schemas JSON-LD para SEO
  const schemaData = composeSchemas(personalInfo, ['Person', 'WebSite', 'ProfilePage']);

  return (
    <>
      <JsonLdSchema data={schemaData} />
      <header>
        <ProfileHeader personalInfo={personalInfo} />
      </header>
      <main id="cv-content">
        <Experience experiences={experiences} />
      </main>
      <footer>
        <ContactSection personalInfo={personalInfo} />
      </footer>
    </>
  );
}

/**
 * Configuración de revalidación para ISR (Incremental Static Regeneration)
 * Revalida el contenido cada hora (3600 segundos)
 */
export const revalidate = 3600;
