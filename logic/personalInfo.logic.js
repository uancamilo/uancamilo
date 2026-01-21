/**
 * @typedef {import('../services/contentful/personalInfo').getPersonalInfo} PersonalInfoData
 */

/**
 * Transforma los datos crudos de información personal de Contentful a una forma estable para la UI.
 * Funciona como un contrato entre la capa de datos y la capa de presentación.
 *
 * @param {Awaited<ReturnType<PersonalInfoData>>} rawData - Los datos crudos del servicio de Contentful.
 * @returns {{
 *   name: string;
 *   title: string;
 *   description: string;
 *   summary: object | null;
 *   email: string;
 *   phone: string;
 *   location: string;
 *   website: string;
 *   socialLinks: { name: string; url: string }[];
 *   sameAs: string[];
 *   profileImage: { url: string; width: number; height: number } | null;
 *   lastModified: string | null;
 * }} Los datos de información personal transformados.
 */
export function adaptPersonalInfo(rawData) {
  if (!rawData) {
    return {
      name: 'Nombre no disponible',
      title: 'Título no disponible',
      description: 'Descripción no disponible',
      summary: null,
      email: '',
      phone: '',
      location: '',
      website: '',
      socialLinks: [],
      sameAs: [],
      profileImage: null,
      lastModified: null,
    };
  }

  const socialLinks = rawData.socialLinksCollection?.items?.filter(Boolean) || [];
  const sameAs = socialLinks.map(item => item.url).filter(Boolean);

  const locationParts = rawData.location?.split(',').map(part => part.trim());
  const city = locationParts?.length > 1 ? locationParts[1] : rawData.location;

  const profileImage = rawData.profileImage
    ? {
        url: rawData.profileImage.url,
        width: rawData.profileImage.width,
        height: rawData.profileImage.height,
      }
    : null;

  return {
    name: rawData.name || 'Nombre no disponible',
    title: rawData.title || 'Título no disponible',
    description: rawData.description || 'Descripción no disponible',
    summary: rawData.summary || null,
    email: rawData.email || '',
    phone: rawData.phone || '',
    location: city || '',
    website: rawData.website || '',
    socialLinks,
    sameAs,
    profileImage,
    lastModified: rawData.sys?.publishedAt || null,
  };
}
