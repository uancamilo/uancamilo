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

/**
 * Mapeo de íconos para redes sociales
 * Extensible: agregar nuevas redes aquí
 */
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
 * ContactSection - Información de contacto y redes sociales
 *
 * Diseño:
 * - Se integra visualmente con el hero (parte del mismo bloque conceptual)
 * - Separador sutil arriba
 * - Layout horizontal en desktop, vertical en mobile
 * - Iconos con hover states
 */
export default function ContactSection({ personalInfo }) {
  if (!personalInfo) return null;

  const { email, phone, location, socialLinks } = personalInfo;

  // Filtrar solo las redes sociales que tenemos iconos
  const validSocialLinks =
    socialLinks?.filter(({ name }) => socialIconMap[name.toLowerCase()]) || [];

  // Si no hay información de contacto, no renderizar
  if (!email && !phone && !location && validSocialLinks.length === 0) {
    return null;
  }

  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className="py-12 border-t border-gray-200 scroll-mt-16"
    >
      <h2 id="contact-heading" className="sr-only">
        Información de contacto
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Información de contacto básica */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <FaEnvelope className="w-4 h-4" aria-hidden="true" />
              <span>{email}</span>
            </a>
          )}

          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <FaPhone className="w-4 h-4" aria-hidden="true" />
              <span>{phone}</span>
            </a>
          )}

          {location && (
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-4 h-4" aria-hidden="true" />
              <span>{location}</span>
            </span>
          )}
        </div>

        {/* Redes sociales */}
        {validSocialLinks.length > 0 && (
          <div className="flex items-center gap-4">
            {validSocialLinks.map(({ name, url }) => {
              const Icon = socialIconMap[name.toLowerCase()];
              return (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Perfil de ${name}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
