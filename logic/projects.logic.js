/**
 * Formatea una fecha ISO a formato legible
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} Fecha formateada (ej: "Ene 2024")
 */
function formatDate(dateString) {
  if (!dateString) return null;

  const date = new Date(dateString);
  const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Transforma un repositorio de GitHub a formato de UI
 * @param {Object} repo - Repositorio crudo desde GitHub API
 * @returns {Object} Proyecto transformado para la UI
 */
function adaptProject(repo) {
  if (!repo) return null;

  return {
    id: repo.id,
    name: repo.name,
    description: repo.description || 'Sin descripción',
    language: repo.language || null,
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    topics: repo.topics || [],
    url: repo.html_url,
    homepage: repo.homepage || null,
    updatedAt: repo.updated_at,
    updatedAtFormatted: formatDate(repo.updated_at),
  };
}

/**
 * Transforma un array de repositorios de GitHub a formato de UI
 * Excluye repos que coinciden con el username (README de perfil)
 * @param {Array} repos - Array de repositorios desde GitHub API
 * @returns {Array} Array de proyectos transformados
 */
export function adaptProjects(repos) {
  if (!repos || !Array.isArray(repos)) {
    return [];
  }

  return repos
    .filter((repo) => {
      // Excluir repo de perfil (donde nombre === username del owner)
      const ownerLogin = repo.owner?.login?.toLowerCase();
      const repoName = repo.name?.toLowerCase();
      return ownerLogin !== repoName;
    })
    .map(adaptProject)
    .filter(Boolean);
}
