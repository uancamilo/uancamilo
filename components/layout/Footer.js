import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaInstagram,
  FaYoutube,
  FaDev,
  FaMedium,
} from 'react-icons/fa';
import { SiX } from 'react-icons/si';

const socialIconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  x: SiX,
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  dev: FaDev,
  'dev.to': FaDev,
  medium: FaMedium,
  website: FaGlobe,
  web: FaGlobe,
};

/**
 * Footer - Cierre visual del sitio
 *
 * Muestra contacto, redes sociales y copyright.
 * Server Component — recibe personalInfo desde layout.js.
 */
export default function Footer({ personalInfo }) {
  const currentYear = new Date().getFullYear();

  if (!personalInfo) {
    return (
      <footer>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500">
          &copy; {currentYear} Todos los derechos reservados.
        </div>
      </footer>
    );
  }

  const { name, email, phone, location, socialLinks } = personalInfo;

  const validSocialLinks =
    socialLinks?.filter(({ name }) => socialIconMap[name.toLowerCase()]) || [];

  const hasContact = email || phone || location;

  return (
    <footer id="contacto" className="scroll-mt-16 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Contacto y redes sociales */}
        {(hasContact || validSocialLinks.length > 0) && (
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-8 border-b border-gray-200">
            {/* Información de contacto */}
            {hasContact && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Contacto
                </h2>
                <ul className="space-y-2 text-sm text-gray-600">
                  {email && (
                    <li>
                      <a
                        href={`mailto:${email}`}
                        title={`Enviar correo a ${email}`}
                        className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                      >
                        <FaEnvelope className="w-4 h-4" aria-hidden="true" />
                        {email}
                      </a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <a
                        href={`tel:${phone}`}
                        title={`Llamar a ${phone}`}
                        className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                      >
                        <FaPhone className="w-4 h-4" aria-hidden="true" />
                        {phone}
                      </a>
                    </li>
                  )}
                  {location && (
                    <li className="flex items-center gap-2">
                      <FaMapMarkerAlt className="w-4 h-4" aria-hidden="true" />
                      {location}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Redes sociales */}
            {validSocialLinks.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Redes
                </h2>
                <div className="flex items-center gap-4">
                  {validSocialLinks.map(({ name, url }) => {
                    const Icon = socialIconMap[name.toLowerCase()];
                    return (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Visitar perfil de ${name}`}
                        aria-label={`Perfil de ${name} (abre en nueva pestaña)`}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                        <span className="sr-only">(abre en nueva pestaña)</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Copyright */}
        <div className="pt-8 text-center text-sm text-gray-500">
          &copy; {currentYear} {name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
