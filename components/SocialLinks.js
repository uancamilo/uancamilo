import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function SocialLinks({ personalInfo, showContactInfo = false }) {
  if (!personalInfo) return null;

  const socialIcons = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    instagram: FaInstagram,
    portfolio: FaGlobe,
    website: FaGlobe,
  };

  const getSocialColor = (platform) => {
    const colors = {
      github: 'hover:text-gray-900',
      linkedin: 'hover:text-blue-600',
      twitter: 'hover:text-blue-400',
      instagram: 'hover:text-pink-600',
      portfolio: 'hover:text-purple-600',
      website: 'hover:text-purple-600',
    };
    return colors[platform] || 'hover:text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        {showContactInfo ? 'Contacto y Redes Sociales' : 'Redes Sociales'}
      </h2>
      
      {showContactInfo && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center text-gray-700">
            <FaEnvelope className="w-5 h-5 mr-3 text-gray-500" />
            <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-600 transition-colors">
              {personalInfo.email}
            </a>
          </div>
          <div className="flex items-center text-gray-700">
            <FaPhone className="w-5 h-5 mr-3 text-gray-500" />
            <a href={`tel:${personalInfo.phone}`} className="hover:text-blue-600 transition-colors">
              {personalInfo.phone}
            </a>
          </div>
          <div className="flex items-center text-gray-700">
            <FaMapMarkerAlt className="w-5 h-5 mr-3 text-gray-500" />
            <span>{personalInfo.location}</span>
          </div>
          {personalInfo.website && (
            <div className="flex items-center text-gray-700">
              <FaGlobe className="w-5 h-5 mr-3 text-gray-500" />
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                {personalInfo.website.replace(/https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {personalInfo.socialLinks && Object.entries(personalInfo.socialLinks).map(([platform, url]) => {
          if (!url) return null;
          
          const IconComponent = socialIcons[platform];
          if (!IconComponent) return null;

          return (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center p-4 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md ${getSocialColor(platform)} hover:border-gray-300`}
            >
              <IconComponent className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium capitalize">{platform}</span>
            </a>
          );
        })}
      </div>
      
      {showContactInfo && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            No dudes en contactarme a través de cualquiera de estos canales. ¡Siempre estoy abierto a discutir nuevas oportunidades y colaboraciones!
          </p>
        </div>
      )}
    </div>
  );
}