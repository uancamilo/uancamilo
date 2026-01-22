import { getPersonalInfo } from '../services/contentful/personalInfo';
import { getExperiences } from '../services/contentful/experience';
import { getSkills } from '../services/contentful/skills';
import { getEducation } from '../services/contentful/education';
import { adaptPersonalInfo } from '../logic/personalInfo.logic';
import { adaptExperiences } from '../logic/experience.logic';
import { adaptSkills, groupSkillsByCategory } from '../logic/skills.logic';
import { adaptEducation } from '../logic/education.logic';
import { composeSchemas } from '../seo/schema/composer';
import { composeMetadataForAppRouter } from '../seo/metadata/composeForAppRouter';

import ProfileHeader from '../components/sections/ProfileHeader';
import ContactSection from '../components/sections/ContactSection';
import Experience from '../components/sections/Experience';
import Skills from '../components/sections/Skills';
import Education from '../components/sections/Education';

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
 * Obtiene y adapta las skills desde Contentful
 */
async function getAndAdaptSkills() {
  try {
    const rawData = await getSkills();
    return adaptSkills(rawData);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching skills:', error);
    }
    return [];
  }
}

/**
 * Obtiene y adapta la formación académica desde Contentful
 */
async function getAndAdaptEducation() {
  try {
    const rawData = await getEducation();
    return adaptEducation(rawData);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching education:', error);
    }
    return [];
  }
}

/**
 * Genera metadata SEO para la página usando App Router API
 * Reutiliza los builders existentes a través del composer
 * Incluye skills en keywords para mejor SEO
 */
export async function generateMetadata() {
  const [personalInfo, skills] = await Promise.all([
    getAndAdaptPersonalInfo(),
    getAndAdaptSkills(),
  ]);
  return composeMetadataForAppRouter(personalInfo, { path: '/', skills });
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
  const [personalInfo, experiences, skills, education] = await Promise.all([
    getAndAdaptPersonalInfo(),
    getAndAdaptExperiences(),
    getAndAdaptSkills(),
    getAndAdaptEducation(),
  ]);

  // Agrupar skills por categoría para la UI
  const skillGroups = groupSkillsByCategory(skills);

  // Componer schemas JSON-LD para SEO (incluye skills en knowsAbout)
  const schemaData = composeSchemas(personalInfo, ['Person', 'WebSite', 'ProfilePage'], { skills, education });

  return (
    <>
      <JsonLdSchema data={schemaData} />
      <header>
        <ProfileHeader personalInfo={personalInfo} />
      </header>
      <main id="cv-content">
        <Skills skillGroups={skillGroups} />
        <Education education={education} />
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
