import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { formatDateRange } from '../data/personal-info';

export default function Education({ education, contentfulEducation }) {
  // Use Contentful data if available, otherwise fall back to static data
  const educationData = contentfulEducation && contentfulEducation.length > 0 
    ? contentfulEducation.map(item => ({
        id: item.sys.id,
        degree: item.fields.degree,
        institution: item.fields.institution,
        location: item.fields.location,
        startDate: item.fields.startDate,
        endDate: item.fields.endDate || 'Present',
        gpa: item.fields.gpa,
        description: item.fields.description,
        achievements: item.fields.achievements || [],
      }))
    : education;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
        Education
      </h2>
      
      <div className="space-y-6">
        {educationData.map((edu) => (
          <div key={edu.id} className="border-l-4 border-blue-500 pl-6 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
            
            <div className="mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
              <p className="text-lg text-blue-600 font-medium">{edu.institution}</p>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="mr-4">{edu.location}</span>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>{formatDateRange(edu.startDate, edu.endDate)}</span>
                {edu.gpa && (
                  <>
                    <span className="mx-2">•</span>
                    <span>GPA: {edu.gpa}</span>
                  </>
                )}
              </div>
            </div>
            
            {edu.description && (
              <div className="mb-3 text-gray-700">
                {typeof edu.description === 'string' ? (
                  <p>{edu.description}</p>
                ) : (
                  documentToReactComponents(edu.description)
                )}
              </div>
            )}
            
            {edu.achievements && edu.achievements.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Achievements:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {edu.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}