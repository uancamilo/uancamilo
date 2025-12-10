export const personalInfo = {
  // Información Básica
  fullName: 'Juan Camilo Serna',
  title: 'Desarrollador Full Stack',
  email: 'juansernamadrid@gmail.com',
  phone: '+57 300 553 4 553',
  location: 'Medellín, Colombia',
  website: 'https://uancamilo.vercel.app/',

  // Resumen Profesional - Esto vendrá de Contentful
  summary:
    'Desarrollador Full Stack con experiencia en el ciclo de vida completo del desarrollo de software, desde el concepto hasta el despliegue. Con dominio del ecosistema de JavaScript (React, Next.js, Node.js) y experiencia usando herramientas de IA como Gemini CLI y ClaudeCode para potenciar la productividad y la calidad del código. Me apasiona la colaboración en equipo y la aplicación de buenas prácticas para garantizar la calidad y agilidad en cada entrega.',

  // Enlaces de Redes Sociales
  socialLinks: {
    github: 'https://github.com/uancamilo',
    linkedin: 'https://linkedin.com/in/uancamilo',
    twitter: 'https://twitter.com/uancamilo',
    instagram: 'https://instagram.com/uancamilo',
    facebook: 'https://facebook.com/uancamilo',
    portfolio: 'https://uancamilo.vercel.app/',
  },

  // Educación - DATOS DE EJEMPLO (será reemplazado por Contentful)
  education: [
    {
      id: 1,
      degree: 'Tecnología en Sistemas',
      institution: 'Institución Universitaria Salazar y Herrera',
      location: 'Medellín, Colombia',
      startDate: '2025',
      endDate: 'En curso',
      gpa: '4.2/5.0',
      achievements: [
        'Mejor proyecto de grado en desarrollo web',
        'Monitor académico en programación',
      ],
    },
    {
      id: 2,
      degree: 'Asistente laboral en desarrollo de software',
      institution: 'CESDE',
      location: 'Presencial',
      startDate: '2024',
      endDate: '2025',
      achievements: ['Completado'],
    },
    {
      id: 3,
      degree: 'Certificación Full Stack Developer',
      institution: 'Digital House',
      location: 'En línea',
      startDate: '2022',
      endDate: '2023',
      achievements: ['Completado'],
    },
  ],

  // Experiencia Laboral - DATOS DE EJEMPLO (será reemplazado por Contentful)
  experience: [
    {
      id: 1,
      position: 'Desarrollador Backend',
      company: 'TCS Colombia',
      location: 'Bogotá, Colombia',
      startDate: 'Junio 2024',
      endDate: 'Diciembre 2024',
      description:
        'Líder de desarrollo responsable de diseñar la arquitectura e implementar aplicaciones web modernas utilizando el ecosistema de React y Node.js.',
      achievements: [
        'Desarrollé e implementé más de 5 aplicaciones web importantes sirviendo a más de 10,000 usuarios',
        'Reduje el tiempo de carga de aplicaciones en un 40% mediante técnicas de optimización',
        'Lideré un equipo de 3 desarrolladores junior e implementé procesos de revisión de código',
      ],
      technologies: [
        'React',
        'Next.js',
        'Node.js',
        'TypeScript',
        'AWS',
        'PostgreSQL',
      ],
    },
    {
      id: 2,
      position: 'Desarrollador Frontend',
      company: 'StartupXYZ',
      location: 'Remoto',
      startDate: 'Jun 2021',
      endDate: 'Dic 2022',
      description:
        'Enfocado en crear interfaces de usuario responsivas e interactivas para plataforma de comercio electrónico.',
      achievements: [
        'Construí plataforma de comercio electrónico responsiva con 99.9% de tiempo de actividad',
        'Implementé funciones en tiempo real usando tecnología WebSocket',
        'Colaboré con el equipo de diseño para mejorar las métricas de UX en un 25%',
      ],
      technologies: [
        'React',
        'Redux',
        'Tailwind CSS',
        'Firebase',
        'Stripe API',
      ],
    },
  ],

  // Habilidades - DATOS DE EJEMPLO (será reemplazado por Contentful)
  skills: {
    technical: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Python',
      'Java',
      'PostgreSQL',
      'MongoDB',
      'GraphQL',
      'REST APIs',
    ],
    tools: [
      'VS Code',
      'Git',
      'Docker',
      'AWS',
      'Vercel',
      'Figma',
      'Postman',
      'Jira',
    ],
    languages: [
      { language: 'Español', level: 'Nativo' },
      { language: 'Inglés', level: 'B1' },
    ],
    soft: [
      'Resolución de Problemas',
      'Trabajo en Equipo',
      'Gestión de Proyectos',
      'Metodologías Ágiles',
      'Comunicación',
      'Mentoría',
    ],
  },

  // Certificaciones - DATOS DE EJEMPLO (será reemplazado por Contentful)
  certifications: [
    {
      id: 1,
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: '2024',
      credentialId: 'AWS-DEV-001',
      url: 'https://aws.amazon.com/certification/',
    },
    {
      id: 2,
      name: 'Certificación Avanzada de React',
      issuer: 'Meta',
      date: '2023',
      credentialId: 'META-REACT-456',
      url: 'https://developers.facebook.com/certifications/',
    },
    {
      id: 3,
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2023',
      credentialId: 'GCP-DEV-789',
      url: 'https://cloud.google.com/certification/',
    },
  ],

  // Proyectos adicionales (se complementará con datos de GitHub)
  additionalProjects: [
    {
      id: 1,
      name: 'Nombre del Proyecto',
      description:
        'Breve descripción de un proyecto notable que no está en GitHub',
      technologies: ['React', 'Node.js', 'MongoDB'],
      url: 'https://url-del-proyecto.com', // Opcional
      achievements: ['Logro clave o métrica', 'Desafío técnico resuelto'],
    },
    // Agregar más proyectos según sea necesario
  ],
};

// Función auxiliar para calcular años de experiencia
export function calculateExperience(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  const years = now.getFullYear() - start.getFullYear();
  return years;
}

// Función auxiliar para formatear rangos de fechas
export function formatDateRange(startDate, endDate) {
  if (endDate === 'Presente' || endDate === 'Present') {
    return `${startDate} - Presente`;
  }
  return `${startDate} - ${endDate}`;
}
