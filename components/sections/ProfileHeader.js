import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function ProfileHeader({ personalInfo }) {
  return (
    <div>
      {/* Fondo decorativo con gradientes */}
      <div>
        <svg
          aria-hidden="true"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      
      {/* Contenido principal centrado y enfocado */}
      <div>
        <h1>
          {personalInfo.name}
        </h1>
        <p>
          {personalInfo.title}
        </p>
        <p>
          {personalInfo.description}
        </p>
        <div>
          {personalInfo.summary && documentToReactComponents(personalInfo.summary.json)}
        </div>
      </div>
    </div>
  );
}
