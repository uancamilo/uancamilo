import { cache } from 'react';
import { fetchAndAdapt } from './fetchAndAdapt';
import { extractPlainText } from './richText';
import { getPersonalInfo } from '../services/contentful/personalInfo';
import { getExperiences } from '../services/contentful/experience';
import { getSkills } from '../services/contentful/skills';
import { getEducation } from '../services/contentful/education';
import { getLanguages } from '../services/contentful/languages';
import { getGitHubProjects, extractGitHubUsername } from '../services/github/projects';
import { adaptPersonalInfo } from '../logic/personalInfo.logic';
import { adaptExperiences } from '../logic/experience.logic';
import { adaptSkills } from '../logic/skills.logic';
import { adaptEducation } from '../logic/education.logic';
import { adaptLanguages } from '../logic/languages.logic';
import { adaptProjects } from '../logic/projects.logic';

/**
 * Fetchers cacheados con React.cache().
 *
 * Next.js solo deduplica GET automáticamente. Contentful usa POST,
 * así que cache() garantiza una sola llamada por render cuando
 * layout.js y page.js invocan la misma función.
 */

export const getCachedPersonalInfo = cache(() =>
  fetchAndAdapt(getPersonalInfo, adaptPersonalInfo, {
    fallback: adaptPersonalInfo(null),
    label: 'personal info',
  })
);

export const getCachedExperiences = cache(() =>
  fetchAndAdapt(getExperiences, adaptExperiences, { label: 'experiences' })
);

export const getCachedSkills = cache(() =>
  fetchAndAdapt(getSkills, adaptSkills, { label: 'skills' })
);

export const getCachedEducation = cache(() =>
  fetchAndAdapt(getEducation, adaptEducation, { label: 'education' })
);

export const getCachedLanguages = cache(() =>
  fetchAndAdapt(getLanguages, adaptLanguages, { label: 'languages' })
);

export const getCachedProjects = cache((githubUsername) =>
  fetchAndAdapt(
    () => getGitHubProjects(githubUsername, { limit: 5 }),
    adaptProjects,
    { label: 'projects' },
  )
);

/**
 * Agrega todos los datos necesarios para el CV (Header, PDF, etc.)
 * Una sola llamada cacheada que orquesta los fetchers individuales.
 */
export const getCachedCvData = cache(async () => {
  const personalInfo = await getCachedPersonalInfo();
  const githubLink = personalInfo.socialLinks?.find(
    (link) => link.name.toLowerCase() === 'github'
  );
  const githubUsername = extractGitHubUsername(githubLink?.url);

  const [experiences, skills, education, languages, projects] = await Promise.all([
    getCachedExperiences(),
    getCachedSkills(),
    getCachedEducation(),
    getCachedLanguages(),
    getCachedProjects(githubUsername),
  ]);

  return {
    personalInfo: {
      ...personalInfo,
      summaryText: extractPlainText(personalInfo.summary?.json),
    },
    experiences,
    skills,
    education,
    languages,
    projects,
  };
});
