'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import CVDocument from './CVDocument';

/**
 * DownloadCV - Botón para generar y descargar el CV en PDF
 *
 * Genera el PDF en el cliente usando @react-pdf/renderer
 * Optimizado para ATS con formato de una columna
 */
export default function DownloadCV({ cvData, className, children }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (isGenerating || !cvData) return;

    setIsGenerating(true);

    try {
      // Generar el PDF blob
      const blob = await pdf(<CVDocument data={cvData} />).toBlob();

      // Crear URL del blob
      const url = URL.createObjectURL(blob);

      // Crear link temporal y disparar descarga
      const link = document.createElement('a');
      link.href = url;
      link.download = `CV_${cvData.personalInfo?.name?.replace(/\s+/g, '_') || 'CV'}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Limpiar
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generando PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating || !cvData}
      className={className}
      aria-busy={isGenerating}
    >
      {isGenerating ? 'Generando...' : children || 'Descargar CV'}
    </button>
  );
}
