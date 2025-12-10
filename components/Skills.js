export default function Skills({ skills, contentfulSkills }) {
  // Use Contentful data if available, otherwise fall back to static data
  const skillsData = contentfulSkills?.fields || skills;

  if (!skillsData) return null;

  const SkillCategory = ({ title, skills, icon, colorClass }) => (
    <div className="mb-6">
      <h3
        className={`text-lg font-semibold ${colorClass} mb-3 flex items-center`}
      >
        {icon}
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border hover:bg-gray-200 transition-colors"
          >
            {typeof skill === 'object'
              ? `${skill.language} (${skill.level})`
              : skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <svg
          className="w-6 h-6 mr-3 text-orange-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        Habilidades y Conocimientos
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {skillsData.technical && (
            <SkillCategory
              title="Habilidades Técnicas"
              skills={skillsData.technical}
              colorClass="text-blue-700"
              icon={
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              }
            />
          )}

          {skillsData.tools && (
            <SkillCategory
              title="Herramientas y Plataformas"
              skills={skillsData.tools}
              colorClass="text-green-700"
              icon={
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
            />
          )}
        </div>

        <div>
          {skillsData.languages && (
            <SkillCategory
              title="Idiomas"
              skills={skillsData.languages}
              colorClass="text-purple-700"
              icon={
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              }
            />
          )}

          {skillsData.soft && (
            <SkillCategory
              title="Habilidades Blandas"
              skills={skillsData.soft}
              colorClass="text-pink-700"
              icon={
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
            />
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Enfoque Profesional
        </h3>
        <p className="text-sm text-gray-600">
          Especializado en el desarrollo web moderno con un fuerte énfasis en la
          experiencia del usuario, la optimización del rendimiento y la
          arquitectura escalable. Siempre dispuesto a aprender nuevas
          tecnologías y mejores prácticas.
        </p>
      </div>
    </div>
  );
}
