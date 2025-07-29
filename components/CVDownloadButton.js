import { useState } from 'react';

export default function CVDownloadButton({ personalInfo }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Dynamic import to ensure it only runs on the client
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Create a clean version of the page for PDF
      const element = document.getElementById('cv-content');
      
      if (!element) {
        alert('CV content not found. Please try again.');
        setIsGenerating(false);
        return;
      }

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${personalInfo?.fullName?.replace(/\s+/g, '_') || 'CV'}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          allowTaint: false
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className={`
          flex items-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg
          ${isGenerating 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:scale-105'
          }
        `}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating PDF...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </>
        )}
      </button>
      
      {/* Alternative download button for mobile */}
      <div className="mt-2">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className={`
            md:hidden w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium text-white transition-all duration-200
            ${isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
            }
          `}
        >
          {isGenerating ? (
            <span className="text-sm">Generating...</span>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span className="text-sm">PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}