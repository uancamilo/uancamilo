import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
} from 'react-icons/fa';

export default function ProfileHeader({
  profile,
  personalInfo,
  contentfulSummary,
}) {
  const summaryData =
    contentfulSummary?.fields?.content || personalInfo.summary;

  const socialIcons = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    instagram: FaInstagram,
    portfolio: FaGlobe,
    website: FaGlobe,
    facebook: FaFacebook,
  };

  const getSocialColor = (platform) => {
    const colors = {
      github: 'hover:text-gray-900',
      linkedin: 'hover:text-blue-600',
      twitter: 'hover:text-blue-400',
      instagram: 'hover:text-pink-600',
      portfolio: 'hover:text-purple-600',
      website: 'hover:text-purple-600',
      facebook: 'hover:text-blue-700',
    };
    return colors[platform] || 'hover:text-gray-600';
  };
  if (!profile || !personalInfo) return <div>Cargando perfil...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna Izquierda: Información Principal */}
        <div className="md:col-span-2">
          <div className="flex items-start space-x-6">
            <img
              src={profile.avatar_url}
              alt={profile.name || profile.login}
              className="w-24 h-24 rounded-full border-4 border-gray-200"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {personalInfo.fullName || profile.name}
              </h1>
              <p className="text-xl font-medium text-indigo-600 mt-1">
                {personalInfo.title}
              </p>
              <p className="text-md text-gray-500 mt-1">@{profile.login}</p>
            </div>
          </div>

          {profile.bio && (
            <p className="text-gray-700 mt-4 text-lg">{profile.bio}</p>
          )}

          <div className="mt-6">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {typeof summaryData === 'string' ? (
                <p>{summaryData}</p>
              ) : (
                documentToReactComponents(summaryData)
              )}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Contacto */}
        <div className="space-y-6">
          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Contacto
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <FaEnvelope className="w-5 h-5 mr-3 text-gray-400" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center text-gray-700">
                <FaPhone className="w-5 h-5 mr-3 text-gray-400" />
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </div>
              <div className="flex items-center text-gray-700">
                <FaMapMarkerAlt className="w-5 h-5 mr-3 text-gray-400" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Redes Sociales
            </h3>
            <div className="flex flex-wrap gap-3">
              {personalInfo.socialLinks &&
                Object.entries(personalInfo.socialLinks).map(
                  ([platform, url]) => {
                    if (!url) return null;
                    const IconComponent = socialIcons[platform];
                    if (!IconComponent) return null;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={platform}
                        className={`p-2 rounded-full border border-gray-200 text-gray-500 transition-colors ${getSocialColor(platform)}`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </a>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
