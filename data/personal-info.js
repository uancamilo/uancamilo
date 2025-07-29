// Personal Information Data Structure - DUMMY DATA
// This will be replaced by Contentful data, but serves as fallback

export const personalInfo = {
  // Basic Information
  fullName: "Camilo Rodriguez",
  title: "Full Stack Developer",
  email: "camilo.rodriguez@email.com",
  phone: "+57 301 234 5678",
  location: "Bogotá, Colombia",
  website: "https://camilorodriguez.dev",
  
  // Professional Summary - This will come from Contentful
  summary: "Passionate Full Stack Developer with 3+ years of experience building modern web applications. Specialized in React, Node.js, and cloud technologies. Strong background in creating scalable solutions and leading development teams.",
  
  // Social Media Links
  socialLinks: {
    github: "https://github.com/uancamilo",
    linkedin: "https://linkedin.com/in/camilo-rodriguez-dev",
    twitter: "https://twitter.com/camilodev",
    instagram: "https://instagram.com/camilo.codes",
    portfolio: "https://camilorodriguez.dev",
  },
  
  // Education - DUMMY DATA (will be replaced by Contentful)
  education: [
    {
      id: 1,
      degree: "Ingeniería de Sistemas",
      institution: "Universidad Nacional de Colombia",
      location: "Bogotá, Colombia",
      startDate: "2018",
      endDate: "2023",
      gpa: "4.2/5.0",
      achievements: [
        "Mejor proyecto de grado en desarrollo web",
        "Monitor académico en programación"
      ]
    },
    {
      id: 2,
      degree: "Certificación Full Stack JavaScript",
      institution: "Platzi",
      location: "Online",
      startDate: "2022",
      endDate: "2023",
      achievements: [
        "Completado con honores",
        "Top 5% de la promoción"
      ]
    },
  ],
  
  // Work Experience - DUMMY DATA (will be replaced by Contentful)
  experience: [
    {
      id: 1,
      position: "Senior Full Stack Developer",
      company: "TechCorp Colombia",
      location: "Bogotá, Colombia",
      startDate: "Jan 2023",
      endDate: "Present",
      description: "Lead developer responsible for architecting and implementing modern web applications using React and Node.js ecosystem.",
      achievements: [
        "Developed and deployed 5+ major web applications serving 10,000+ users",
        "Reduced application load time by 40% through optimization techniques",
        "Led a team of 3 junior developers and implemented code review processes"
      ],
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "AWS", "PostgreSQL"]
    },
    {
      id: 2,
      position: "Frontend Developer",
      company: "StartupXYZ",
      location: "Remote",
      startDate: "Jun 2021",
      endDate: "Dec 2022",
      description: "Focused on creating responsive and interactive user interfaces for e-commerce platform.",
      achievements: [
        "Built responsive e-commerce platform with 99.9% uptime",
        "Implemented real-time features using WebSocket technology",
        "Collaborated with design team to improve UX metrics by 25%"
      ],
      technologies: ["React", "Redux", "Tailwind CSS", "Firebase", "Stripe API"]
    },
  ],
  
  // Skills - DUMMY DATA (will be replaced by Contentful)
  skills: {
    technical: [
      "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
      "Python", "Java", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs"
    ],
    tools: [
      "VS Code", "Git", "Docker", "AWS", "Vercel", "Figma", "Postman", "Jira"
    ],
    languages: [
      { language: "Spanish", level: "Native" },
      { language: "English", level: "Advanced (C1)" },
      { language: "Portuguese", level: "Intermediate (B2)" }
    ],
    soft: [
      "Problem Solving", "Team Leadership", "Project Management", 
      "Agile Methodologies", "Communication", "Mentoring"
    ]
  },
  
  // Certifications - DUMMY DATA (will be replaced by Contentful)
  certifications: [
    {
      id: 1,
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialId: "AWS-DEV-001",
      url: "https://aws.amazon.com/certification/"
    },
    {
      id: 2,
      name: "React Advanced Certification",
      issuer: "Meta",
      date: "2023",
      credentialId: "META-REACT-456",
      url: "https://developers.facebook.com/certifications/"
    },
    {
      id: 3,
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2023",
      credentialId: "GCP-DEV-789",
      url: "https://cloud.google.com/certification/"
    },
  ],
  
  // Projects (will be complemented with GitHub data)
  additionalProjects: [
    {
      id: 1,
      name: "Project Name",
      description: "Brief description of a notable project not on GitHub",
      technologies: ["React", "Node.js", "MongoDB"],
      url: "https://project-url.com", // Optional
      achievements: [
        "Key achievement or metric",
        "Technical challenge solved"
      ]
    },
    // Add more projects as needed
  ]
};

// Helper function to calculate years of experience
export function calculateExperience(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  const years = now.getFullYear() - start.getFullYear();
  return years;
}

// Helper function to format date ranges
export function formatDateRange(startDate, endDate) {
  if (endDate === "Present") {
    return `${startDate} - Present`;
  }
  return `${startDate} - ${endDate}`;
}