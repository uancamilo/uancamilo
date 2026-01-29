/**
 * Componente para mostrar bloques de código con syntax highlighting
 * El HTML ya viene pre-renderizado desde Shiki en el servidor
 *
 * @param {Object} props
 * @param {string} props.html - HTML con sintaxis resaltada de Shiki
 * @param {string} [props.language] - Lenguaje del código
 * @param {string} [props.filename] - Nombre del archivo (opcional)
 * @param {string} [props.caption] - Descripción del código (opcional)
 */
export default function CodeBlock({ html, language, filename, caption }) {
  return (
    <figure className="my-6">
      {filename && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-gray-700 flex items-center gap-2">
          <FileIcon className="w-4 h-4" />
          <span>{filename}</span>
          {language && (
            <span className="ml-auto text-xs text-gray-500 uppercase">
              {language}
            </span>
          )}
        </div>
      )}
      <div
        className={`shiki-wrapper overflow-x-auto ${filename ? 'rounded-b-lg' : 'rounded-lg'}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {caption && (
        <figcaption className="text-sm text-gray-500 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Icono de archivo simple
 */
function FileIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
}
