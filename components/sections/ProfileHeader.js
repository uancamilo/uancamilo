import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const socialIconMap = {
  github: { icon: FaGithub },
  linkedin: { icon: FaLinkedin },
  twitter: { icon: FaTwitter },
  website: { icon: FaGlobe },
};

const InfoItem = ({ icon: Icon, text, href }) => {
  const content = (
    <span>
      <Icon aria-hidden="true" />
      <span>{text}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
};

/** @type {Options} */
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
  },
};

export default function ProfileHeader({ personalInfo }) {
  return (
    <header>
      <div>
        <div>
          <div>
            <h1>{personalInfo.name}</h1>
            <p>{personalInfo.description}</p>

            <div>
              {personalInfo.summary &&
                documentToReactComponents(
                  personalInfo.summary.json,
                  richTextOptions
                )}
            </div>
          </div>

          <address>
            <div>
              <h2>Contacto y Enlaces</h2>
              <ul role="list">
                {personalInfo.location && (
                  <li>
                    <InfoItem
                      icon={FaMapMarkerAlt}
                      text={personalInfo.location}
                    />
                  </li>
                )}
                {personalInfo.email && (
                  <li>
                    <InfoItem
                      icon={FaEnvelope}
                      text={personalInfo.email}
                      href={`mailto:${personalInfo.email}`}
                    />
                  </li>
                )}
                {personalInfo.phone && (
                  <li>
                    <InfoItem
                      icon={FaPhone}
                      text={personalInfo.phone}
                      href={`tel:${personalInfo.phone}`}
                    />
                  </li>
                )}
                {personalInfo.website && (
                  <li>
                    <InfoItem
                      icon={FaGlobe}
                      text="Sitio Web"
                      href={personalInfo.website}
                    />
                  </li>
                )}
              </ul>

              <div>
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
          </address>
        </div>
      </div>
    </header>
  );
}
