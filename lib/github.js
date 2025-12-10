const GITHUB_API_BASE = 'https://api.github.com';
const USERNAME = 'uancamilo';

export async function getGitHubProfile() {
  const response = await fetch(`${GITHUB_API_BASE}/users/${USERNAME}`);
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub profile');
  }
  return response.json();
}

export async function getGitHubRepos() {
  const response = await fetch(`${GITHUB_API_BASE}/users/${USERNAME}/repos?sort=updated&per_page=30`);
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repositories');
  }
  return response.json();
}

export async function getGitHubLanguages() {
  const repos = await getGitHubRepos();
  const languagePromises = repos
    .slice(0, 10) // Limit to top 10 repos to avoid rate limiting
    .map(repo => 
      fetch(`${GITHUB_API_BASE}/repos/${USERNAME}/${repo.name}/languages`)
        .then(res => res.ok ? res.json() : {})
        .catch(() => ({}))
    );
  
  const languagesArrays = await Promise.all(languagePromises);
  
  // Combine all languages and calculate totals
  const languageTotals = {};
  languagesArrays.forEach(languages => {
    Object.entries(languages).forEach(([lang, bytes]) => {
      languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
    });
  });
  
  return languageTotals;
}