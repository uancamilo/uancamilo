import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import { createHighlighter } from 'shiki';

// Singleton para el highlighter de Shiki
let highlighterInstance = null;
let highlighterPromise = null;

/**
 * Obtiene o crea el highlighter de Shiki (singleton)
 * @returns {Promise<Object>} Instancia del highlighter
 */
async function getHighlighter() {
  if (highlighterInstance) {
    return highlighterInstance;
  }

  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: [
        'javascript',
        'typescript',
        'python',
        'java',
        'sql',
        'bash',
        'json',
        'html',
        'css',
        'jsx',
        'tsx',
        'markdown',
        'yaml',
        'xml',
        'go',
        'rust',
        'c',
        'cpp',
        'csharp',
        'php',
        'ruby',
        'swift',
        'kotlin',
        'scala',
        'shell',
        'powershell',
        'dockerfile',
        'graphql',
        'text',
        'plaintext',
      ],
    });
  }

  highlighterInstance = await highlighterPromise;
  return highlighterInstance;
}

/**
 * Resalta código con Shiki
 * @param {string} code - Código a resaltar
 * @param {string} language - Lenguaje del código
 * @returns {Promise<string>} HTML con sintaxis resaltada
 */
async function highlightCode(code, language) {
  try {
    const highlighter = await getHighlighter();

    // Normalizar el nombre del lenguaje
    const normalizedLang = language?.toLowerCase() || 'text';

    // Verificar si el lenguaje está soportado
    const loadedLangs = highlighter.getLoadedLanguages();
    const lang = loadedLangs.includes(normalizedLang) ? normalizedLang : 'text';

    const html = highlighter.codeToHtml(code, {
      lang,
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    });

    return html;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error highlighting code:', error);
    }
    // Fallback: devolver código sin resaltado
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
}

/**
 * Escapa caracteres HTML
 * @param {string} text - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Pre-procesa los bloques de código en el markdown
 * @param {string} markdown - Contenido markdown
 * @returns {Promise<Map>} Map de código original -> HTML resaltado
 */
async function preprocessCodeBlocks(markdown) {
  const codeBlocksMap = new Map();

  // Regex para encontrar bloques de código con lenguaje
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;

  const promises = [];

  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    const language = match[1] || 'text';
    const code = match[2].trimEnd();
    const fullMatch = match[0];

    promises.push(
      highlightCode(code, language).then((html) => {
        codeBlocksMap.set(fullMatch, html);
      })
    );
  }

  await Promise.all(promises);
  return codeBlocksMap;
}

/**
 * Componente para renderizar bloques de código con Shiki
 */
function CodeBlock({ codeBlocksMap, inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';
  const code = String(children).replace(/\n$/, '');

  if (inline) {
    return (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    );
  }

  // Buscar el HTML pre-renderizado
  const fullMatch = `\`\`\`${language}\n${code}\`\`\``;
  const highlightedHtml = codeBlocksMap.get(fullMatch);

  if (highlightedHtml) {
    return (
      <div
        className="shiki-wrapper overflow-x-auto rounded-lg my-6"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    );
  }

  // Fallback sin highlighting
  return (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
      <code className="font-mono text-sm" {...props}>
        {children}
      </code>
    </pre>
  );
}

/**
 * Renderiza el contenido Markdown del blog con syntax highlighting
 * @param {string} markdown - Contenido markdown
 * @returns {Promise<JSX.Element>} Componente React con el contenido renderizado
 */
export async function renderBlogRichText(markdown) {
  if (!markdown) {
    return null;
  }

  try {
    // Pre-procesar bloques de código
    const codeBlocksMap = await preprocessCodeBlocks(markdown);

    // Componentes personalizados para ReactMarkdown
    const components = {
      h1: ({ children }) => (
        <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2">{children}</h4>
      ),
      p: ({ children }) => (
        <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
      ),
      ul: ({ children }) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 ml-4">{children}</ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 ml-4">{children}</ol>
      ),
      li: ({ children }) => <li>{children}</li>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-600">
          {children}
        </blockquote>
      ),
      hr: () => <hr className="my-8 border-gray-200" />,
      a: ({ href, children }) => (
        <a
          href={href}
          className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
          target={href?.startsWith('http') ? '_blank' : undefined}
          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ),
      img: ({ src, alt }) => (
        <figure className="my-6">
          <Image
            src={src}
            alt={alt || ''}
            width={800}
            height={450}
            className="rounded-lg max-w-full h-auto"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </figure>
      ),
      code: (props) => <CodeBlock codeBlocksMap={codeBlocksMap} {...props} />,
      pre: ({ children }) => <>{children}</>,
      table: ({ children }) => (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
            {children}
          </table>
        </div>
      ),
      thead: ({ children }) => (
        <thead className="bg-gray-50">{children}</thead>
      ),
      th: ({ children }) => (
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{children}</th>
      ),
      td: ({ children }) => (
        <td className="px-4 py-3 text-sm text-gray-700 border-t border-gray-200">{children}</td>
      ),
    };

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error rendering blog rich text:', error);
    }
    // Fallback: mostrar texto plano
    return <div className="prose text-gray-700 whitespace-pre-wrap">{markdown}</div>;
  }
}
