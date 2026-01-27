/**
 * Extrae texto plano de un documento Rich Text de Contentful.
 * Útil para contextos donde no se puede renderizar JSX (ej: PDF, meta tags).
 *
 * @param {Object|null} richTextJson - Documento Rich Text de Contentful ({ content: [...] })
 * @returns {string} Texto plano extraído
 */
export function extractPlainText(richTextJson) {
  if (!richTextJson?.content) return '';

  return richTextJson.content
    .map((node) => {
      if (node.nodeType === 'paragraph' && node.content) {
        return node.content.map((textNode) => textNode.value || '').join('');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}
