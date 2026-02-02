'use client';

import { useState, useEffect } from 'react';
import {
  FaLinkedinIn,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaLink,
  FaCheck,
} from 'react-icons/fa';
import { SiX } from 'react-icons/si';

/**
 * Icono de compartir genérico
 */
function ShareIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
      />
    </svg>
  );
}

/**
 * Botones de compartir para artículos del blog
 *
 * @param {Object} props
 * @param {string} props.url - URL completa del artículo
 * @param {string} props.title - Título del artículo
 * @param {string} props.excerpt - Descripción corta del artículo
 * @param {string} props.variant - Variante visual: 'compact' | 'full'
 */
export default function ShareButtons({ url, title, excerpt, variant = 'full' }) {
  const [copied, setCopied] = useState(false);
  const [copiedInstagram, setCopiedInstagram] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  // Copiar para Instagram
  const copyForInstagram = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedInstagram(true);
      setTimeout(() => setCopiedInstagram(false), 3000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedInstagram(true);
      setTimeout(() => setCopiedInstagram(false), 3000);
    }
  };

  // URLs de compartir para cada red
  const shareUrls = {
    x: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  // Copiar al portapapeles
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Compartir nativo (Web Share API)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url,
        });
      } catch {
        // Usuario canceló o error
      }
    }
  };

  // Configuración de botones
  const socialButtons = [
    {
      name: 'X',
      icon: SiX,
      href: shareUrls.x,
      hoverClass: 'hover:bg-black hover:text-white hover:border-black',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      href: shareUrls.linkedin,
      hoverClass: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      href: shareUrls.facebook,
      hoverClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      href: shareUrls.whatsapp,
      hoverClass: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]',
    },
  ];

  // Estilos según variante
  const buttonSize = variant === 'compact' ? 'w-9 h-9' : 'w-10 h-10';
  const iconSize = variant === 'compact' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const buttonBaseClass = `flex items-center justify-center ${buttonSize} rounded-full bg-white border border-gray-200 text-gray-500 transition-all duration-200 hover:shadow-md`;

  return (
    <div
      className="flex items-center gap-2 flex-wrap"
      role="group"
      aria-label="Compartir artículo"
    >
      {/* Etiqueta */}
      {variant === 'full' && (
        <span className="text-sm text-gray-500 mr-1">Compartir:</span>
      )}

      {/* Botones de redes sociales */}
      {socialButtons.map(({ name, icon: Icon, href, hoverClass }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBaseClass} ${hoverClass}`}
          aria-label={`Compartir en ${name}`}
        >
          <Icon className={iconSize} />
        </a>
      ))}

      {/* Instagram - Copia enlace con tooltip */}
      <div className="relative">
        <button
          onClick={copyForInstagram}
          className={`${buttonBaseClass} ${
            copiedInstagram
              ? 'bg-[#E4405F] text-white border-[#E4405F]'
              : 'hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F]'
          }`}
          aria-label="Copiar enlace para Instagram"
        >
          <FaInstagram className={iconSize} />
        </button>
        {copiedInstagram && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
            Enlace copiado. ¡Pégalo en Instagram Stories!
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </div>
        )}
      </div>

      {/* Copiar enlace */}
      <button
        onClick={copyToClipboard}
        className={`${buttonBaseClass} ${
          copied
            ? 'bg-green-500 text-white border-green-500'
            : 'hover:bg-gray-100 hover:text-gray-700'
        }`}
        aria-label={copied ? 'Enlace copiado' : 'Copiar enlace'}
      >
        {copied ? (
          <FaCheck className={iconSize} />
        ) : (
          <FaLink className={iconSize} />
        )}
      </button>

      {/* Compartir nativo (solo en móviles compatibles) */}
      {canNativeShare && (
        <button
          onClick={handleNativeShare}
          className={`${buttonBaseClass} hover:bg-blue-600 hover:text-white hover:border-blue-600`}
          aria-label="Más opciones de compartir"
        >
          <ShareIcon className={iconSize} />
        </button>
      )}
    </div>
  );
}
