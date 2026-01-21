/**
 * @typedef {import('../services/contentful/skills').getSkills} SkillsData
 */

/**
 * Mapeo de categorías a nombres legibles
 */
const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  ai: 'Inteligencia Artificial',
  devops: 'DevOps',
  database: 'Bases de Datos',
  tools: 'Herramientas',
  other: 'Otras',
};

/**
 * Transforma los datos crudos de skills de Contentful a una forma estable para la UI.
 * Funciona como un contrato entre la capa de datos y la capa de presentación.
 *
 * @param {Awaited<ReturnType<SkillsData>>} rawData - Los datos crudos del servicio de Contentful.
 * @returns {{
 *   id: string;
 *   name: string;
 *   description: string | null;
 *   features: string[];
 *   level: number;
 *   url: string | null;
 *   category: string;
 * }[]} Array de skills transformadas.
 */
export function adaptSkills(rawData) {
  if (!rawData || !Array.isArray(rawData)) {
    return [];
  }

  return rawData
    .filter((skill) => skill?.name && typeof skill?.level === 'number')
    .map((skill) => ({
      id: skill.sys?.id || skill.name,
      name: skill.name,
      description: skill.description || null,
      features: Array.isArray(skill.features) ? skill.features : [],
      level: Math.min(100, Math.max(0, skill.level)),
      url: skill.url || null,
      category: skill.category || 'other',
    }));
}

/**
 * Agrupa las skills por categoría.
 *
 * @param {ReturnType<typeof adaptSkills>} skills - Array de skills adaptadas.
 * @returns {{ category: string; label: string; skills: typeof skills }[]} Array de grupos.
 */
export function groupSkillsByCategory(skills) {
  const groups = {};

  skills.forEach((skill) => {
    const cat = skill.category;
    if (!groups[cat]) {
      groups[cat] = {
        category: cat,
        label: categoryLabels[cat] || cat,
        skills: [],
      };
    }
    groups[cat].skills.push(skill);
  });

  return Object.values(groups);
}
