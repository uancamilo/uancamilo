import { groupSkillsByCategory } from '../logic/skills.logic';
import { composeSchemas } from '../seo/schema/composer';
import { composeMetadataForAppRouter } from '../seo/metadata/composeForAppRouter';
import {
  getCachedPersonalInfo,
  getCachedSkills,
  getCachedCvData,
} from '../lib/data';

import ProfileHeader from '../components/sections/ProfileHeader';
import Experience from '../components/sections/Experience';
import Skills from '../components/sections/Skills';
import Education from '../components/sections/Education';
import Languages from '../components/sections/Languages';
import Projects from '../components/sections/Projects';

/**
 * Genera metadata SEO para la página usando App Router API
 * Reutiliza los builders existentes a través del composer
 * Incluye skills en keywords para mejor SEO
 */
export async function generateMetadata() {
  const [personalInfo, skills] = await Promise.all([
    getCachedPersonalInfo(),
    getCachedSkills(),
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
 *
 * Header y Footer se renderizan desde layout.js
 */
export default async function HomePage() {
  const cvData = await getCachedCvData();

  const { personalInfo, experiences, skills, education, languages, projects } = cvData;

  // Agrupar skills por categoría para la UI
  const skillGroups = groupSkillsByCategory(skills);

  // Componer schemas JSON-LD para SEO
  const schemaData = composeSchemas(personalInfo, ['Person', 'WebSite', 'ProfilePage'], {
    skills,
    education,
    languages,
    projects,
  });

  return (
    <>
      <JsonLdSchema data={schemaData} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <header>
          <ProfileHeader personalInfo={personalInfo} />
        </header>
        <main id="cv-content">
          <Skills skillGroups={skillGroups} />
          <Education education={education} />
          <Languages languages={languages} />
          <Projects projects={projects} />
          <Experience experiences={experiences} />
        </main>
      </div>
    </>
  );
}

/**
 * Configuración de revalidación para ISR (Incremental Static Regeneration)
 * Revalida el contenido cada hora (3600 segundos)
 */
export const revalidate = 3600;
