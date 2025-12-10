import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { formatDateRange } from '../data/personal-info';

export default function Experience({ experience, contentfulExperience }) {
  // Use Contentful data if available, otherwise fall back to static data
  const experienceData =
    contentfulExperience && contentfulExperience.length > 0
      ? contentfulExperience.map((item) => ({
          id: item.sys.id,
          position: item.fields.position,
          company: item.fields.company,
          location: item.fields.location,
          startDate: item.fields.startDate,
          endDate: item.fields.endDate || 'Presente',
          description: item.fields.description,
          achievements: item.fields.achievements || [],
          technologies: item.fields.technologies || [],
        }))
      : experience;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <svg
          className="w-6 h-6 mr-3 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6z"
          />
        </svg>
        Experiencia Profesional
      </h2>

      <div className="space-y-8">
        {experienceData.map((exp) => (
          <div
            key={exp.id}
            className="border-l-4 border-green-500 pl-6 relative"
          >
            <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full"></div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {exp.position}
              </h3>
              <p className="text-lg text-green-600 font-medium">
                {exp.company}
              </p>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="mr-4">{exp.location}</span>
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{formatDateRange(exp.startDate, exp.endDate)}</span>
              </div>
            </div>

            {exp.description && (
              <div className="mb-4 text-gray-700">
                {typeof exp.description === 'string' ? (
                  <p>{exp.description}</p>
                ) : (
                  documentToReactComponents(exp.description)
                )}
              </div>
            )}

            {exp.achievements && exp.achievements.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Logros Clave:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}

            {exp.technologies && exp.technologies.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Tecnologías Utilizadas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
