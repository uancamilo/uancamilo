import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function ProfessionalSummary({ summary, contentfulSummary }) {
  // Use Contentful data if available, otherwise fall back to static data
  const summaryData = contentfulSummary?.fields?.content || summary;

  if (!summaryData) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <svg className="w-6 h-6 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Professional Summary
      </h2>
      
      <div className="prose prose-gray max-w-none">
        {typeof summaryData === 'string' ? (
          <p className="text-gray-700 leading-relaxed text-lg">{summaryData}</p>
        ) : (
          <div className="text-gray-700 leading-relaxed">
            {documentToReactComponents(summaryData)}
          </div>
        )}
      </div>
    </div>
  );
}