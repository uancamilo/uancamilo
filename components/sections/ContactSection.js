// components/sections/ContactSection.js
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

// Mapeo de íconos para redes sociales, ahora local a este componente.
const socialIconMap = {
  github: { icon: FaGithub },
  linkedin: { icon: FaLinkedin },
  twitter: { icon: FaTwitter },
};

// Componente para mostrar ítems de información, ahora local a este componente.
const InfoItem = ({ icon: Icon, label, value, href }) => { // Removed isAction prop
  const content = (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div>
          <Icon aria-hidden="true" />
        </div>
        {content}
      </a>
    );
  }

  return (
    <div>
      <div>
        <Icon aria-hidden="true" />
      </div>
      {content}
    </div>
  );
};


export default function ContactSection({ personalInfo }) {
  return (
    <section aria-labelledby="contact-heading">
      <div>
        <div>
          <h2 id="contact-heading">
            Contacto y Enlaces
          </h2>
          <p>
            Puedes encontrarme en los siguientes canales.
          </p>
        </div>
        <div>
          {personalInfo.email && (
            <InfoItem
              icon={FaEnvelope}
              label="Email"
              value="Envíame un correo"
              href={`mailto:${personalInfo.email}`}
              // Removed isAction={true}
            />
          )}
          {personalInfo.website && (
            <InfoItem
              icon={FaGlobe}
              label="Sitio Web"
              value="Visita mi portafolio"
              href={personalInfo.website}
              // Removed isAction={true}
            />
          )}
          {personalInfo.phone && (
            <InfoItem
              icon={FaPhone}
              label="Teléfono"
              value={personalInfo.phone}
              href={`tel:${personalInfo.phone}`}
            />
          )}
          {personalInfo.location && (
            <InfoItem
              icon={FaMapMarkerAlt}
              label="Ubicación"
              value={personalInfo.location}
            />
          )}
        </div>
        
        {/* Íconos de Redes Sociales */}
        <div>
          <h3>Redes Sociales</h3>
          {personalInfo.socialLinks?.map(({ name, url }) => {
            const social = socialIconMap[name.toLowerCase()];
            if (!social) return null;
            const Icon = social.icon;
            return (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
              >
                <Icon aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}