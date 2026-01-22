const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Extrae el username de GitHub desde una URL
 * @param {string} url - URL del perfil de GitHub (ej: https://github.com/uancamilo)
 * @returns {string|null} Username extraído o null si no es válido
 */
export function extractGitHubUsername(url) {
  if (!url) return null;

  const match = url.match(/github\.com\/([^/?]+)/i);
  return match ? match[1] : null;
}

/**
 * Obtiene los repositorios públicos de un usuario de GitHub
 * Ordenados por última actualización, limitados a un número específico
 *
 * @param {string} username - Username de GitHub
 * @param {Object} options - Opciones de configuración
 * @param {number} [options.limit=5] - Número máximo de repos a obtener
 * @param {string} [options.sort='updated'] - Criterio de ordenamiento
 * @returns {Promise<Array>} Array de repositorios
 */
export async function getGitHubProjects(username, options = {}) {
  const { limit = 5, sort = 'updated' } = options;

  if (!username) {
    console.warn('GitHub username no proporcionado');
    return [];
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=${sort}&direction=desc&per_page=${limit}&type=public`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: {
          revalidate: 3600, // Cache por 1 hora (ISR)
        },
      }
    );

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return [];
    }

    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}
