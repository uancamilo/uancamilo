/**
 * Extrae texto plano de un documento Rich Text de Contentful.
 * Útil para contextos donde no se puede renderizar JSX (ej: PDF, meta tags).
 *
 * @param {Object|null} richTextJson - Documento Rich Text de Contentful ({ content: [...] })
 * @param {string} [separator=' '] - Separador entre párrafos (' ' para meta tags, '\n' para PDF)
 * @returns {string} Texto plano extraído
 */
export function extractPlainText(richTextJson, separator = ' ') {
  if (!richTextJson?.content) return '';

  return richTextJson.content
    .map((node) => {
      if (node.nodeType === 'paragraph' && node.content) {
        return node.content.map((textNode) => textNode.value || '').join('');
      }
      return '';
    })
    .filter(Boolean)
    .join(separator);
}
