/**
 * Construye un objeto EducationalOrganization para alumniOf
 * @param {Object} education - Educación con institution y degree
 * @returns {Object} Schema EducationalOrganization válido
 */
function buildAlumniOfItem(education) {
  return {
    '@type': 'EducationalOrganization',
    name: education.institution,
  };
}

/**
 * Construye un objeto Language para knowsLanguage
 * @param {Object} language - Idioma con name y level
 * @returns {Object} Schema Language válido
 */
function buildLanguageItem(language) {
  const schema = {
    '@type': 'Language',
    name: language.name,
  };

  if (language.level) {
    schema.alternateName = language.level;
  }

  return schema;
}

/**
 * Construye un objeto DefinedTerm para knowsAbout
 * @param {Object} skill - Skill con name, url y description opcionales
 * @returns {Object|string} DefinedTerm si tiene URL o description, string si no
 */
function buildKnowsAboutItem(skill) {
  if (skill.url || skill.description) {
    const term = {
      '@type': 'DefinedTerm',
      name: skill.name,
    };

    if (skill.description) {
      term.description = skill.description;
    }

    if (skill.url) {
      term.url = skill.url;
    }

    return term;
  }
  return skill.name;
}

/**
 * Builder para schema Person de Schema.org
 * @param {Object} data - Datos normalizados de la persona
 * @param {string} data.name - Nombre completo
 * @param {string} data.jobTitle - Título profesional
 * @param {string} data.email - Email de contacto
 * @param {string} data.phone - Teléfono de contacto
 * @param {string} data.location - Ciudad/Localidad
 * @param {string} data.website - URL del sitio web
 * @param {Object} [data.profileImage] - Imagen de perfil
 * @param {string} [data.profileImage.url] - URL de la imagen
 * @param {string[]} [data.sameAs] - URLs de perfiles sociales
 * @param {Array} [data.skills] - Array de skills con name y url
 * @param {Array} [data.education] - Array de formación académica
 * @param {Array} [data.languages] - Array de idiomas con name y level
 * @returns {Object} Schema Person válido
 */
export function buildPersonSchema(data) {
  const siteUrl = data.website || '';

  const schema = {
    '@type': 'Person',
    '@id': `${siteUrl}#person`,
    name: data.name,
    url: siteUrl,
  };

  if (data.profileImage?.url) {
    schema.image = data.profileImage.url;
  }

  if (data.title) {
    schema.jobTitle = data.title;
  }

  if (data.email) {
    schema.email = data.email;
  }

  if (data.phone) {
    schema.telephone = data.phone;
  }

  if (data.location) {
    schema.address = {
      '@type': 'PostalAddress',
      addressLocality: data.location,
      addressCountry: {
        '@type': 'Country',
        name: 'CO',
      },
    };
  }

  if (data.sameAs?.length > 0) {
    schema.sameAs = data.sameAs;
  }

  // knowsAbout con DefinedTerm (skills con URLs)
  if (data.skills?.length > 0) {
    schema.knowsAbout = data.skills.map(buildKnowsAboutItem);
  }

  // alumniOf (formación académica)
  if (data.education?.length > 0) {
    schema.alumniOf = data.education.map(buildAlumniOfItem);
  }

  // knowsLanguage (idiomas)
  if (data.languages?.length > 0) {
    schema.knowsLanguage = data.languages.map(buildLanguageItem);
  }

  // ContactPoint estructurado
  if (data.email || data.phone) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'professional',
    };

    if (data.email) {
      schema.contactPoint.email = data.email;
    }

    if (data.phone) {
      schema.contactPoint.telephone = data.phone;
    }
  }

  return schema;
}
