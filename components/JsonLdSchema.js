// components/JsonLdSchema.js

const JsonLdSchema = ({ personalInfo, profile, repos }) => {
    const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.fullName,
    url: personalInfo.website,
    sameAs: personalInfo.socialLinks
      ? Object.values(personalInfo.socialLinks).filter((url) => url)
      : [],
    jobTitle: personalInfo.title,
    image: profile.avatar_url,
    description: personalInfo.summary,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personalInfo.location.split(',')[0],
      addressCountry: personalInfo.location.split(',')[1]?.trim(),
    },
    email: `mailto:${personalInfo.email}`,
    telephone: personalInfo.phone,
    alumniOf: personalInfo.education?.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.institution,
      location: edu.location,
    })),
    worksFor: personalInfo.experience?.map((exp) => ({
      '@type': 'Organization',
      name: exp.company,
    })),
    hasOccupation: personalInfo.experience?.map((exp) => ({
      '@type': 'Role',
      roleName: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      worksFor: {
        '@type': 'Organization',
        name: exp.company,
      },
    })),
    knowsAbout: [
      ...(personalInfo.skills?.technical || []),
      ...(personalInfo.skills?.tools || []),
    ],
    knowsLanguage: personalInfo.skills?.languages?.map((lang) => lang.language),
    owns: repos?.map((repo) => ({
      '@type': 'SoftwareSourceCode',
      name: repo.name,
      description: repo.description,
      codeRepository: repo.html_url,
      programmingLanguage: repo.language,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLdSchema;
